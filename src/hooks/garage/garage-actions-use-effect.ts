"use client"

import { useEffect } from "react"
import garageActions from "../../utils/garage/garage-actions"
import { actionMappings } from "../../utils/constants/constants"

export default function useGarageActionsUseEffect(): void {
	const { activateAction, deactivateAction } = garageActions()

	// Key event handlers
	const handleKeyDown = async (event: KeyboardEvent): Promise<void> => {
		// Ignore if focus is in an input, textarea, or contenteditable element
		const active = document.activeElement as HTMLElement
		if (
			active &&
		(
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)
		) {
			return
		}

		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const action = actionMappings[key]
		await activateAction(action)
	}

	const handleKeyUp = async (event: KeyboardEvent): Promise<void> => {
		// Ignore if focus is in an input, textarea, or contenteditable element
		const active = document.activeElement as HTMLElement
		if (
			active &&
		(
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)
		) {
			return
		}

		const key = event.key.toLowerCase()
		if (!(key in actionMappings)) return

		const action = actionMappings[key]
		await deactivateAction(action)
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
