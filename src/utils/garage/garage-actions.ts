"use client"

import { MessageBuilder } from "@actamayev/lever-labs-common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import toastClass from "../../classes/toast-class"
import { isNull } from "lodash-es"
import { ToneType } from "@actamayev/lever-labs-common-ts/protocol"

// eslint-disable-next-line max-lines-per-function
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
					isNull(selectedPip) ||
					(selectedPip.pipConnectionStatus === "offline")
				) {
					return toastClass.negative({
						title: "Pip not connected",
						description: "Please connect your Pip to the Wi-Fi or via USB to turn on the headlights"
					})
				}
				socketClass.emitToServer("headlight-update", {
					pipUUID: selectedPip.pipUUID,
					areHeadlightsOn: true
				})
				return

			case "horn":
				// Skip if garage sounds are disabled by teacher
				if (!garageClass.garageTonesStatus) return

				garageClass.setIsHornPressed(true)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createToneCommandMessage(ToneType.A)
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}

				if (
					isNull(selectedPip) ||
					(selectedPip.pipConnectionStatus === "offline")
				) {
					return toastClass.negative({
						title: "Pip not connected",
						description: "Please connect your Pip to the Wi-Fi or via USB to honk the horn"
					})
				}
				socketClass.emitToServer("play-tone", {
					pipUUID: selectedPip.pipUUID,
					toneType: ToneType.A
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
				if (!garageClass.garageTonesStatus) return

				garageClass.setIsHornPressed(false)

				if (serialConnectionManagerClass.pipTurnedOn) {
					const buffer = MessageBuilder.createStopToneCommandMessage()
					await serialConnectionManagerClass.sendBinaryMessage(buffer)
					return
				}
				if (
					!selectedPip ||
					selectedPip.pipConnectionStatus === "offline"
				) return
				socketClass.emitToServer("stop-tone", { pipUUID: selectedPip.pipUUID })
				return
		}
	}

	return {
		activateAction,
		deactivateAction
	}
}
