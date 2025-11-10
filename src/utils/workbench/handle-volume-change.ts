"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
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
				description: "Please connect your Pip to the Wi-Fi or via USB to change the volume"
			})
		}
		const changeVolumeResponse = await leverLabsApiClient.workbenchDataService.changeVolume(
			volume,
			selectedPip.pipUUID
		)
		if (!isEqual(changeVolumeResponse.status, 200) || isErrorResponse(changeVolumeResponse.data)) {
			throw Error("Unable to change volume on Pip")
		}
		workbenchClass.setVolume(volume)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to change volume on Pip",
			description: "Please reload the page and try again"
		})
	}
}
