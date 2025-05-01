"use client"

import { useEffect } from "react"
import { actionMappings } from "../../utils/constants"
import { usePipContext } from "../../contexts/pip-context"
import { useGarageContext } from "../../contexts/garage-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { MessageBuilder } from "@bluedotrobots/common-ts"

export default function useGarageActionsUseEffect(): void {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const serialManager = useSerialManagerContext()

	// Key event handlers
	const handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const mapping = actionMappings[key]

		if (mapping === "headlights") {
			garageClass.setAreHeadlightsOn(true)
			if (serialManager.connected) {
				const buffer = MessageBuilder.createHeadlightMessage(true)

				await serialManager.sendBinaryMessage(buffer)
				return
			}

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					areHeadlightsOn: true
				})
			}
			return
		}
		garageClass.setIsHornPressed(true)

		if (pipClass.selectedPip) {
			socketClass.emitHornSound({
				pipUUID: pipClass.selectedPip.pipUUID,
				hornStatus: true
			})
		}
	}

	const handleKeyUp = async (event: KeyboardEvent): Promise<void> => {
		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const mapping = actionMappings[key]

		if (mapping === "headlights") {
			garageClass.setAreHeadlightsOn(false)
			if (serialManager.connected) {
				const buffer = MessageBuilder.createHeadlightMessage(false)

				await serialManager.sendBinaryMessage(buffer)
				return
			}

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					areHeadlightsOn: false
				})
			}
			return
		}
		garageClass.setIsHornPressed(false)

		if (pipClass.selectedPip) {
			socketClass.emitHornSound({
				pipUUID: pipClass.selectedPip.pipUUID,
				hornStatus: false
			})
		}
	}

	// Set up key event listeners
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
