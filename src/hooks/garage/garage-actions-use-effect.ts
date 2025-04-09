"use client"

import { useEffect } from "react"
import { actionMappings } from "../../utils/constants"
import { usePipContext } from "../../contexts/pip-context"
import { useGarageContext } from "../../contexts/garage-context"
import { useSocketContext } from "../../contexts/socket-context"

export default function useGarageActionsUseEffect(): void {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()

	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const mapping = actionMappings[key]

		if (mapping === "headlights") {
			garageClass.setAreHeadlightsOn(true)

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					headlightsStatus: true
				})
			}
		} else if (mapping === "horn") {
			garageClass.setIsHornPressed(true)

			if (pipClass.selectedPip) {
				socketClass.emitHornSound({
					pipUUID: pipClass.selectedPip.pipUUID,
					hornStatus: true
				})
			}
		}
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const mapping = actionMappings[key]

		if (mapping === "headlights") {
			garageClass.setAreHeadlightsOn(false)

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					headlightsStatus: false
				})
			}
		} else if (mapping === "horn") {
			garageClass.setIsHornPressed(false)

			if (pipClass.selectedPip) {
				socketClass.emitHornSound({
					pipUUID: pipClass.selectedPip.pipUUID,
					hornStatus: false
				})
			}
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
