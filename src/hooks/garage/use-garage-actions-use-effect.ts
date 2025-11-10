"use client"

import { useEffect } from "react"
import garageActions from "../../utils/garage/garage-actions"
import { actionMappings } from "../../utils/constants/constants"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"

export default function useGarageActionsUseEffect(): void {
	const { activateAction, deactivateAction } = garageActions()

	// Key event handlers
	// eslint-disable-next-line complexity
	const handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Ignore if focus is in an input, textarea, or contenteditable element
		const active = document.activeElement as HTMLElement
		if (active && (
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)) {
			return
		}

		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const action = actionMappings[key]

		// Skip if horn action and garage tones are disabled by teacher
		if (action === "horn" && !garageClass.garageTonesStatus) return

		// Skip if headlights action and garage lights are disabled by teacher
		if (action === "headlights" && !garageClass.garageLightsStatus) return

		await activateAction(action)
	}

	// eslint-disable-next-line complexity
	const handleKeyUp = async (event: KeyboardEvent): Promise<void> => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Ignore if focus is in an input, textarea, or contenteditable element
		const active = document.activeElement as HTMLElement
		if (active && (
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)) {
			return
		}

		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const action = actionMappings[key]

		// Skip if horn action and garage tones are disabled by teacher
		if (action === "horn" && !garageClass.garageTonesStatus) return

		// Skip if headlights action and garage lights are disabled by teacher
		if (action === "headlights" && !garageClass.garageLightsStatus) return

		await deactivateAction(action)
	}

	// Set up key event listeners
	useEffect((): () => void => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
