"use client"

import { useEffect } from "react"
import { motorKeyMappings } from "../../utils/constants"
import useApplyMotorControl from "./apply-motor-control"
import useComputeMotorControl from "./compute-motor-control"
import garageClass from "../../classes/garage-class"

export default function useMotorDriveUseEffect(): void {
	const computeMotorControl = useComputeMotorControl()
	const applyMotorControl = useApplyMotorControl()

	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in motorKeyMappings)) return

		// Prevent default behavior for navigation keys
		if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
			event.preventDefault()
		}

		const mapping = motorKeyMappings[key]

		garageClass.setPressedKey(mapping.direction, Date.now())

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in motorKeyMappings)) return

		const mapping = motorKeyMappings[key]


		garageClass.removePressedKey(mapping.direction)

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	// Set up key event listeners
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)

			// Clear any active motor control when unmounting
			applyMotorControl({ vertical: 0, horizontal: 0 })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Watch for changes in motorThrottlePercent and emit updates
	useEffect(() => {
		// If throttle changes, re-emit the current motor state
		if (garageClass.lastThrottlePercent !== garageClass.motorThrottlePercent) {
			applyMotorControl(garageClass.motorState, true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.motorThrottlePercent])
}
