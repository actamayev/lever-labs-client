"use client"

import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function garageActions(): {
	activateAction: (action: Actions) => Promise<void>
	deactivateAction: (action: Actions) => Promise<void>
} {
	// eslint-disable-next-line complexity
	const activateAction = async (action: Actions): Promise<void> => {
		const selectedPip = pipClass.selectedPip
		switch (action) {
			case "headlights":
				// Skip if garage lights are disabled by teacher
				if (!garageClass.garageLightsStatus) return

				garageClass.setAreHeadlightsOn(true)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHeadlightMessage(true)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!selectedPip ||
				selectedPip.pipConnectionStatus === "offline"
				) return
				socketClass.emitToServer("headlight-update", {
					pipUUID: selectedPip.pipUUID,
					areHeadlightsOn: true
				})
				return

			case "horn":
				// Skip if garage sounds are disabled by teacher
				if (!garageClass.garageSoundsStatus) return

				garageClass.setIsHornPressed(true)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHornSoundMessage(true)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!selectedPip ||
				selectedPip.pipConnectionStatus === "offline"
				) return
				socketClass.emitToServer("horn-sound-update", {
					pipUUID: selectedPip.pipUUID,
					hornStatus: true
				})
				return
		}
	}

	/**
   * Handle turning an action off
   */
	// eslint-disable-next-line complexity
	const deactivateAction = async (action: Actions): Promise<void> => {
		const selectedPip = pipClass.selectedPip
		switch (action) {
			case "headlights":
				// Skip if garage lights are disabled by teacher
				if (!garageClass.garageLightsStatus) return

				garageClass.setAreHeadlightsOn(false)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHeadlightMessage(false)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					!selectedPip ||
				selectedPip.pipConnectionStatus === "offline"
				) return
				socketClass.emitToServer("headlight-update", {
					pipUUID: selectedPip.pipUUID,
					areHeadlightsOn: false
				})
				return

			case "horn":
				// Skip if garage sounds are disabled by teacher
				if (!garageClass.garageSoundsStatus) return

				garageClass.setIsHornPressed(false)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createHornSoundMessage(false)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}
				if (
					!selectedPip ||
				selectedPip.pipConnectionStatus === "offline"
				) return
				socketClass.emitToServer("horn-sound-update", {
					pipUUID: selectedPip.pipUUID,
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
