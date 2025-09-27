"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import changeAudibleStatus from "./change-audible-status"

export default async function handleVolumeChange(value: number[]): Promise<void> {
	try {
		const volume = value[0]
		workbenchClass.setVolume(value[0])
		if (workbenchClass.isMuted && value[0] > 0) {
			changeAudibleStatus(false)
		}
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createSpeakerVolumeMessage(volume)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip) || selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await blueDotApiClient.workbenchDataService.changeVolume(
			volume,
			selectedPip.pipUUID
		)
		if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
			throw Error("Unable to change volume")
		}
		workbenchClass.setVolume(volume)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to change volume",
			description: "Please reload the page and try again"
		})
	}
}
