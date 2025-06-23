"use client"

import { useEffect } from "react"
import { soundMappings } from "../../utils/constants/constants"
import pipClass from "../../classes/pip-class"
import garageClass from "../../classes/garage-class"
import socketClass from "../../classes/socket-class"

export default function useGarageSoundsUseEffect(): void {
	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return

		const sound = soundMappings[key]
		garageClass.setSoundPlaying(sound)
		if (!pipClass.selectedPip) return
		socketClass.emitSound({
			pipUUID: pipClass.selectedPip.pipUUID,
			sound
		})
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields

		const key = event.key.toLowerCase()
		if (!(key in soundMappings)) return
		garageClass.setSoundPlaying(null)
	}

	// Set up key event listeners
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])
}
