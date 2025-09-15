"use client"

import { useEffect, useCallback } from "react"
import { soundMappings } from "../../utils/constants/constants"
import garageClass from "../../classes/garage-class"
import pipClass from "../../classes/pip-class"
import playFunSound from "../../utils/garage/play-fun-sound"

export default function useGarageSoundsUseEffect(isInGarage: boolean): void {
	// Key event handlers
	const handleKeyDown = useCallback((event: KeyboardEvent): void => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Skip if in garage and sounds are disabled by teacher
		if (isInGarage && !garageClass.garageSoundsStatus) return

		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return

		const sound = soundMappings[key]
		garageClass.setSoundPlaying(sound)
		playFunSound(sound)
	}, [isInGarage])

	const handleKeyUp = useCallback((event: KeyboardEvent): void => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Skip if in garage and sounds are disabled by teacher
		if (isInGarage && !garageClass.garageSoundsStatus) return

		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return
		garageClass.setSoundPlaying(null)
	}, [isInGarage])

	// Set up key event listeners
	useEffect((): () => void => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [handleKeyDown, handleKeyUp, isInGarage])
}
