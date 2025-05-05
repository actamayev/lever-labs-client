"use client"

import { usePipContext } from "../../contexts/pip-context"
import { useGarageContext } from "../../contexts/garage-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { MessageBuilder } from "@bluedotrobots/common-ts"

export default function useGarageActions(): {
	activateAction: (action: Actions) => Promise<void>
	deactivateAction: (action: Actions) => Promise<void>
	} {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const serialManager = useSerialManagerContext()

	const activateAction = async (action: Actions): Promise<void> => {
		switch (action) {
		case "headlights":
			garageClass.setAreHeadlightsOn(true)

			if (serialManager.connected) {
				const buffer = MessageBuilder.createHeadlightMessage(true)
				await serialManager.sendBinaryMessage(buffer)
				return
			}

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus !== "connected"
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
				pipClass.selectedPip.pipConnectionStatus !== "connected"
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

			if (serialManager.connected) {
				const buffer = MessageBuilder.createHeadlightMessage(false)
				await serialManager.sendBinaryMessage(buffer)
				return
			}

			if (
				!pipClass.selectedPip ||
				pipClass.selectedPip.pipConnectionStatus !== "connected"
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
				pipClass.selectedPip.pipConnectionStatus !== "connected"
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
