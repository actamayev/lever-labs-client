"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import { ToneType } from "@lever-labs/common-ts/protocol"
import toastClass from "../../classes/toast-class"
import garageClass from "../../classes/garage-class"
import pipClass from "../../classes/pip-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function playFunSound(tone: ToneType | null): Promise<void> {
	try {
		garageClass.setTonePlaying(tone)
		if (serialConnectionManagerClass.pipTurnedOn) {
			if (tone === null) {
				const buffer = MessageBuilder.createStopToneCommandMessage()
				await serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}
			const buffer = MessageBuilder.createToneCommandMessage(tone)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		const selectedPip = pipClass.selectedPip
		if (
			isNull(selectedPip) ||
			(selectedPip.pipConnectionStatus === "offline")
		) {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tone"
			})
		}
		if (tone === null) {
			socketClass.emitToServer("stop-tone", {
				pipUUID: selectedPip.pipUUID
			})
			return
		}
		socketClass.emitToServer("play-tone", {
			pipUUID: selectedPip.pipUUID,
			toneType: tone
		})
		return
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to play tone at this time",
			description: "Please reload the page and try again"
		})
	}
}
