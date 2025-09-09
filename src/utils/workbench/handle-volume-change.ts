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
import changeAudibleStatus from "./change-audible-status"

export default async function handleVolumeChange(value: number[]): Promise<void> {
	try {
		const volume = value[0]
		getWorkbenchClass().setVolume(value[0])
		if (getWorkbenchClass().isMuted && value[0] > 0) {
			changeAudibleStatus(false)
		}
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createSpeakerVolumeMessage(volume)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (isNull(getPipClass().selectedPip) || getPipClass().selectedPip.pipConnectionStatus === "offline") {
			return getToastClass().negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await getBlueDotApiClientClass().workbenchDataService.changeVolume(
			volume,
			getPipClass().selectedPip.pipUUID
		)
		if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
			throw Error("Unable to change volume")
		}
		getWorkbenchClass().setVolume(volume)
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: "Unable to change volume",
			description: "Please reload the page and try again"
		})
	}
}
