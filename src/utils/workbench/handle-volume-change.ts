"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
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

			console.log("Sending buffer", buffer)
			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (isNull(pipClass.selectedPip) || pipClass.selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await blueDotApiClientClass.workbenchDataService.changeVolume(
			volume,
			pipClass.selectedPip.pipUUID
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
