"use client"

import isNull from "lodash-es/isNull"
import { FunSounds } from "@bluedotrobots/common-ts/types/garage"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { tuneToSoundType } from "@bluedotrobots/common-ts/protocol"
import toastClass from "../../classes/toast-class"
import garageClass from "../../classes/garage-class"
import pipClass from "../../classes/pip-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function playFunSound(sound: FunSounds): Promise<void> {
	try {
		garageClass.setSoundPlaying(sound)
		if (serialConnectionManagerClass.pipTurnedOn) {
			const soundType = tuneToSoundType[sound]
			const buffer = MessageBuilder.createSoundMessage(soundType)

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			isNull(pipClass.selectedPip) ||
			(pipClass.selectedPip.pipConnectionStatus === "offline")
		) {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		socketClass.emitToServer("play-fun-sound", {
			pipUUID: pipClass.selectedPip.pipUUID,
			sound
		})
		return
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to play fun sound at this time",
			description: "Please reload the page and try again"
		})
	}
}
