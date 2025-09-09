"use client"

import isNull from "lodash-es/isNull"
import { FunSounds } from "@bluedotrobots/common-ts/types/garage"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { tuneToSoundType } from "@bluedotrobots/common-ts/protocol"
import getToastClass from "../../classes/toast-class"
import getGarageClass from "../../classes/garage-class"
import getPipClass from "../../classes/pip-class"
import getSocketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function playFunSound(sound: FunSounds): Promise<void> {
	try {
		getGarageClass().setSoundPlaying(sound)
		if (serialConnectionManagerClass.pipTurnedOn) {
			const soundType = tuneToSoundType[sound]
			const buffer = MessageBuilder.createSoundMessage(soundType)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		const selectedPip = getPipClass().selectedPip
		if (
			isNull(selectedPip) ||
			(selectedPip.pipConnectionStatus === "offline")
		) {
			return getToastClass().negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		getSocketClass().emitToServer("play-fun-sound", {
			pipUUID: selectedPip.pipUUID,
			sound
		})
		return
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: "Unable to play fun sound at this time",
			description: "Please reload the page and try again"
		})
	}
}
