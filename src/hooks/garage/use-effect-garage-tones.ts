"use client"

import { useEffect, useCallback } from "react"
import { toneMappings } from "../../utils/constants/constants"
import garageClass from "../../classes/garage-class"
import pipClass from "../../classes/pip-class"
import playFunTone from "../../utils/garage/play-fun-tone"

export default function useGarageTonesUseEffect(isInGarage: boolean): void {
	// Key event handlers
	const handleKeyDown = useCallback((event: KeyboardEvent): void => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Skip if in garage and tones are disabled by teacher
		if (isInGarage && !garageClass.garageTonesStatus) return

		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in toneMappings)) return

		const tone = toneMappings[key]
		garageClass.setTonePlaying(tone)
		playFunTone(tone)
	}, [isInGarage])

	const handleKeyUp = useCallback((event: KeyboardEvent): void => {
		// Skip if Connect to Pip dialog is open
		if (pipClass.isConnectPipDialogOpen) return

		// Skip if in garage and tones are disabled by teacher
		if (isInGarage && !garageClass.garageTonesStatus) return

		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in toneMappings)) return
		garageClass.setTonePlaying(null)
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
