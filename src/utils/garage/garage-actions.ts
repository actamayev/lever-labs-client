"use client"

import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function garageActions(): {
	activateAction: (action: Actions) => Promise<void>
	deactivateAction: (action: Actions) => Promise<void>
	} {
	const activateAction = async (action: Actions): Promise<void> => {
		switch (action) {
		case "headlights":
			garageClass.setAreHeadlightsOn(true)

			if (serialConnectionManagerClass.pipTurnedOn) {
				const buffer = MessageBuilder.createHeadlightMessage(true)
				await serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return
			socketClass.emitHeadLightStatus({
				pipUUID: pipClass.selectedPip.pipUUID,
				areHeadlightsOn: true
			})
			return

		case "horn":
			garageClass.setIsHornPressed(true)

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return
			socketClass.emitHornSound({
				pipUUID: pipClass.selectedPip.pipUUID,
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
			garageClass.setAreHeadlightsOn(false)

			if (serialConnectionManagerClass.pipTurnedOn) {
				const buffer = MessageBuilder.createHeadlightMessage(false)
				await serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return
			socketClass.emitHeadLightStatus({
				pipUUID: pipClass.selectedPip.pipUUID,
				areHeadlightsOn: false
			})
			return

		case "horn":
			garageClass.setIsHornPressed(false)

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return
			socketClass.emitHornSound({
				pipUUID: pipClass.selectedPip.pipUUID,
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
