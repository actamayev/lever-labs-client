"use client"

import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getGarageClass from "../../classes/garage-class"
import getSocketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function garageActions(): {
	activateAction: (action: Actions) => Promise<void>
	deactivateAction: (action: Actions) => Promise<void>
} {
	const activateAction = async (action: Actions): Promise<void> => {
		switch (action) {
			case "headlights":
				getGarageClass().setAreHeadlightsOn(true)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHeadlightMessage(true)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!getPipClass().selectedPip ||
				getPipClass().selectedPip.pipConnectionStatus === "offline"
				) return
				getSocketClass().emitToServer("headlight-update", {
					pipUUID: getPipClass().selectedPip.pipUUID,
					areHeadlightsOn: true
				})
				return

			case "horn":
				getGarageClass().setIsHornPressed(true)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHornSoundMessage(true)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!getPipClass().selectedPip ||
				getPipClass().selectedPip.pipConnectionStatus === "offline"
				) return
				getSocketClass().emitToServer("horn-sound-update", {
					pipUUID: getPipClass().selectedPip.pipUUID,
					hornStatus: true
				})
				return
		}
	}

	/**
   * Handle turning an action off
   */
	const deactivateAction = async (action: Actions): Promise<void> => {
		switch (action) {
			case "headlights":
				getGarageClass().setAreHeadlightsOn(false)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHeadlightMessage(false)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!getPipClass().selectedPip ||
				getPipClass().selectedPip.pipConnectionStatus === "offline"
				) return
				getSocketClass().emitToServer("headlight-update", {
					pipUUID: getPipClass().selectedPip.pipUUID,
					areHeadlightsOn: false
				})
				return

			case "horn":
				getGarageClass().setIsHornPressed(false)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHornSoundMessage(false)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}
				if (
					!getPipClass().selectedPip ||
				getPipClass().selectedPip.pipConnectionStatus === "offline"
				) return
				getSocketClass().emitToServer("horn-sound-update", {
					pipUUID: getPipClass().selectedPip.pipUUID,
					hornStatus: false
				})
				return
		}
	}

	return {
		activateAction,
		deactivateAction
	}
}
