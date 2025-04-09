"use client"

import { useEffect } from "react"
import { keyMappings } from "../../utils/constants"
import useApplyMotorControl from "./apply-motor-control"
import useComputeMotorControl from "./compute-motor-control"
import { useGarageContext } from "../../contexts/garage-context"
import { usePipContext } from "../../contexts/pip-context"
import { useSocketContext } from "../../contexts/socket-context"

export default function useMotorDriveUseEffect(): void {
	const garageClass = useGarageContext()
	const computeMotorControl = useComputeMotorControl()
	const applyMotorControl = useApplyMotorControl()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()

	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in keyMappings)) return

		// Prevent default behavior for navigation keys
		if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
			event.preventDefault()
		}

		const mapping = keyMappings[key]

		// Handle special action keys (headlights and horn)
		if (mapping.axis === "action") {
			if (mapping.direction === "headlights") {
				garageClass.setAreHeadlightsOn(true)

				if (pipClass.selectedPip) {
					socketClass.emitHeadLightStatus({
						pipUUID: pipClass.selectedPip.pipUUID,
						headlightsStatus: true
					})
				}
			} else if (mapping.direction === "horn") {
				garageClass.setIsHornPressed(true)

				if (pipClass.selectedPip) {
					socketClass.emitHornSound({
						pipUUID: pipClass.selectedPip.pipUUID,
						hornStatus: true
					})
				}
			}
		}

		garageClass.setPressedKey(mapping.direction, Date.now())

		// Compute and apply motor control for movement keys
		if (mapping.axis !== "action") {
			const motorControl = computeMotorControl()
			applyMotorControl(motorControl)
		}
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in keyMappings)) return

		const mapping = keyMappings[key]

		// Handle special action keys (headlights and horn)
		if (mapping.axis === "action") {
			if (mapping.direction === "headlights") {
				garageClass.setAreHeadlightsOn(false)

				if (pipClass.selectedPip) {
					socketClass.emitHeadLightStatus({
						pipUUID: pipClass.selectedPip.pipUUID,
						headlightsStatus: false
					})
				}
			} else if (mapping.direction === "horn") {
				garageClass.setIsHornPressed(false)

				if (pipClass.selectedPip) {
					socketClass.emitHornSound({
						pipUUID: pipClass.selectedPip.pipUUID,
						hornStatus: false
					})
				}
			}
		}

		garageClass.removePressedKey(mapping.direction)

		// Compute and apply motor control for movement keys
		if (mapping.axis !== "action") {
			const motorControl = computeMotorControl()
			applyMotorControl(motorControl)
		}
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
