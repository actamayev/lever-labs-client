"use client"

import { useEffect } from "react"
import { soundMappings } from "../../utils/constants"
import { usePipContext } from "../../classes/pip-context"
import { useGarageContext } from "../../classes/garage-context"
import { useSocketContext } from "../../classes/socket-context"

export default function useGarageSoundsUseEffect(): void {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()

	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
	// Check if the event target is an input field or any element where typing is expected
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) {
			return // Skip processing keyboard shortcuts when typing in fields
		}

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
	// Same check as handleKeyDown
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) {
			return
		}

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
