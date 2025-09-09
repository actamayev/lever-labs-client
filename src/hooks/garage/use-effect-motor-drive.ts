"use client"

import { useEffect } from "react"
import getGarageClass from "../../classes/garage-class"
import { motorKeyMappings } from "../../utils/constants/constants"
import applyMotorControl from "../../utils/garage/apply-motor-control"
import computeMotorControl from "../../utils/garage/compute-motor-control"

export default function useEffectMotorDrive(): void {
	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields
		const key = event.key.toLowerCase()
		if (!(key in motorKeyMappings)) return

		// Prevent default behavior for navigation keys
		if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
			event.preventDefault()
		}

		const mapping = motorKeyMappings[key]

		getGarageClass().setPressedKey(mapping.direction, Date.now())

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const target = event.target as HTMLElement
		if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
		target.isContentEditable) return // Skip processing keyboard shortcuts when typing in fields
		const key = event.key.toLowerCase()
		if (!(key in motorKeyMappings)) return

		const mapping = motorKeyMappings[key]


		getGarageClass().removePressedKey(mapping.direction)

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	// Set up key event listeners
	useEffect((): () => void => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)

			// Clear any active motor control when unmounting
			applyMotorControl({ vertical: 0, horizontal: 0 })
		}

	}, [])

	// Watch for changes in motorThrottlePercent and emit updates
	useEffect((): void => {
		// If throttle changes, re-emit the current motor state
		if (getGarageClass().lastThrottlePercent !== getGarageClass().motorThrottlePercent) {
			applyMotorControl(getGarageClass().motorState, true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getGarageClass().motorThrottlePercent])
}
