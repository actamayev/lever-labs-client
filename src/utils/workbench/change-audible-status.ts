"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function changeAudibleStatus(newMutedState: boolean): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createSpeakerMuteMessage(!workbenchClass.isMuted)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			workbenchClass.setIsMuted(newMutedState)
			return
		}

		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip) || selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await blueDotApiClient.workbenchDataService.changeAudibleStatus(
			newMutedState,
			selectedPip.pipUUID
		)
		if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
			throw Error("Unable to change mute status")
		}
		workbenchClass.setIsMuted(newMutedState)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to change mute status",
			description: "Please reload the page and try again"
		})
	}
}
