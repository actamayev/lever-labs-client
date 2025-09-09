"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import getWorkbenchClass from "../../classes/workbench-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function changeAudibleStatus(newMutedState: boolean): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createSpeakerMuteMessage(!getWorkbenchClass().isMuted)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			getWorkbenchClass().setIsMuted(newMutedState)
			return
		}
		if (isNull(getPipClass().selectedPip) || getPipClass().selectedPip.pipConnectionStatus === "offline") {
			return getToastClass().negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await getBlueDotApiClientClass().workbenchDataService.changeAudibleStatus(
			newMutedState,
			getPipClass().selectedPip.pipUUID
		)
		if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
			throw Error("Unable to change mute status")
		}
		getWorkbenchClass().setIsMuted(newMutedState)
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: "Unable to change mute status",
			description: "Please reload the page and try again"
		})
	}
}
