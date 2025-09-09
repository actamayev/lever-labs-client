"use client"

import { useEffect } from "react"
import { soundMappings } from "../../utils/constants/constants"
import getGarageClass from "../../classes/garage-class"
import playFunSound from "../../utils/garage/play-fun-sound"

export default function useGarageSoundsUseEffect(): void {
	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return

		const sound = soundMappings[key]
		getGarageClass().setSoundPlaying(sound)
		playFunSound(sound)
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return
		getGarageClass().setSoundPlaying(null)
	}

	// Set up key event listeners
	useEffect((): () => void => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])
}
