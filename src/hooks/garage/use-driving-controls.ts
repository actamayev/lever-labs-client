"use client"

import isNull from "lodash-es/isNull"
import { useEffect, useRef } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { useSocketContext } from "../../contexts/socket-context"
import { useGarageContext } from "../../contexts/garage-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

interface KeyMapping {
	direction: MotorDirection;
	axis: "vertical" | "horizontal";
	value: -1 | 0 | 1;
	driveDirection: DriveDirection;
}

const keyMappings: Record<string, KeyMapping> = {
	"w": { direction: "up", axis: "vertical", value: 1, driveDirection: "forward" },
	"arrowup": { direction: "up", axis: "vertical", value: 1, driveDirection: "forward" },
	"s": { direction: "down", axis: "vertical", value: -1, driveDirection: "backward" },
	"arrowdown": { direction: "down", axis: "vertical", value: -1, driveDirection: "backward" },
	"a": { direction: "left", axis: "horizontal", value: -1, driveDirection: "left" },
	"arrowleft": { direction: "left", axis: "horizontal", value: -1, driveDirection: "left" },
	"d": { direction: "right", axis: "horizontal", value: 1, driveDirection: "right" },
	"arrowright": { direction: "right", axis: "horizontal", value: 1, driveDirection: "right" }
}

const directionToMapping = Object.values(keyMappings).reduce((acc, mapping) => {
	acc[mapping.direction] = mapping
	return acc
}, {} as Record<MotorDirection, KeyMapping>)

interface ReturnFunctions {
	handleButtonDown: (direction: MotorDirection) => void
	handleButtonUp: (direction: MotorDirection) => void
	isButtonPressed: (direction: MotorDirection) => boolean
}

// eslint-disable-next-line max-lines-per-function
export default function useHybridDrivingControls(): ReturnFunctions {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const blueDotApiClient = useApiClientContext()

	const pressedKeysRef = useRef<Map<MotorDirection, number>>(new Map())
	const pressedDirectionsRef = useRef<Set<DriveDirection>>(new Set())
	const motorStateRef = useRef<MotorControlInput>({ vertical: 0, horizontal: 0 })
	const lastThrottlePercentRef = useRef<number>(garageClass.motorThrottlePercent)

	// Compute motor control values based on pressed keys
	const computeMotorControl = (keys: Map<MotorDirection, number>): MotorControlInput => {
		const motorControl: MotorControlInput = { vertical: 0, horizontal: 0 }

		const verticalKeys = Array.from(keys.entries())
			.filter(([dir]) => directionToMapping[dir].axis === "vertical")
			.sort(([, timeA], [, timeB]) => timeA - timeB)

		const horizontalKeys = Array.from(keys.entries())
			.filter(([dir]) => directionToMapping[dir].axis === "horizontal")
			.sort(([, timeA], [, timeB]) => timeA - timeB)

		if (verticalKeys.length > 0) {
			const [latestVerticalDir] = verticalKeys[verticalKeys.length - 1]
			motorControl.vertical = directionToMapping[latestVerticalDir].value
		}

		if (horizontalKeys.length > 0) {
			const [latestHorizontalDir] = horizontalKeys[horizontalKeys.length - 1]
			motorControl.horizontal = directionToMapping[latestHorizontalDir].value
		}

		return motorControl
	}

	// Map motor control values to drive directions
	const motorControlToDriveDirections = (motorControl: { vertical: number, horizontal: number }): Set<DriveDirection> => {
		const directions = new Set<DriveDirection>()

		if (motorControl.vertical > 0) directions.add("forward")
		else if (motorControl.vertical < 0) directions.add("backward")

		if (motorControl.horizontal > 0) directions.add("right")
		else if (motorControl.horizontal < 0) directions.add("left")

		return directions
	}

	// Apply motor control to both garage and socket
	const applyMotorControl = (motorControl: MotorControlInput, forceEmit: boolean = false): void => {
		const throttleChanged = lastThrottlePercentRef.current !== garageClass.motorThrottlePercent

		// Skip if no change in motor control and throttle hasn't changed, unless forced
		if (
			!forceEmit &&
			!throttleChanged &&
			motorControl.vertical === motorStateRef.current.vertical &&
			motorControl.horizontal === motorStateRef.current.horizontal
		) {
			return
		}

		// Update references
		motorStateRef.current = motorControl
		lastThrottlePercentRef.current = garageClass.motorThrottlePercent

		// 1. Update garage using drive directions
		const newDirections = motorControlToDriveDirections(motorControl)
		const currentDirections = pressedDirectionsRef.current

		// Stop directions that are no longer active
		currentDirections.forEach(dir => {
			if (!newDirections.has(dir)) {
				garageClass.stopDriving(dir)
			}
		})

		// Start directions that are newly active
		newDirections.forEach(dir => {
			if (!currentDirections.has(dir)) {
				garageClass.drive(dir)
			}
		})

		// Update current directions
		pressedDirectionsRef.current = newDirections

		if (isNull(blueDotApiClient.httpClient.accessToken)) return

		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip" })
		}
		if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return toast.negative({ title: `Please connect ${pipClass.selectedPip.pipName} to the internet` })
		}

		console.log("garageClass.motorThrottlePercent", garageClass.motorThrottlePercent)
		// Emit motor control via socket
		socketClass.emitMotorControl({
			motorControl,
			pipUUID: pipClass.selectedPip.pipUUID,
			motorThrottlePercent: garageClass.motorThrottlePercent
		})
	}

	// Key event handlers
	const handleKeyDown = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in keyMappings)) return

		// Prevent default behavior for navigation keys
		if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
			event.preventDefault()
		}

		const mapping = keyMappings[key]
		const newMap = new Map(pressedKeysRef.current)
		newMap.set(mapping.direction, Date.now())
		pressedKeysRef.current = newMap

		// Compute and apply motor control
		const motorControl = computeMotorControl(newMap)
		applyMotorControl(motorControl)
	}

	const handleKeyUp = (event: KeyboardEvent): void => {
		const key = event.key.toLowerCase()
		if (!(key in keyMappings)) return

		const mapping = keyMappings[key]
		const newMap = new Map(pressedKeysRef.current)
		newMap.delete(mapping.direction)
		pressedKeysRef.current = newMap

		// Compute and apply motor control
		const motorControl = computeMotorControl(newMap)
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
		if (lastThrottlePercentRef.current !== garageClass.motorThrottlePercent) {
			applyMotorControl(motorStateRef.current, true)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.motorThrottlePercent])

	// Return handlers for button presses (for the ArrowKeyButton component)
	return {
		handleButtonDown: (direction: MotorDirection): void => {
			const newMap = new Map(pressedKeysRef.current)
			newMap.set(direction, Date.now())
			pressedKeysRef.current = newMap

			const motorControl = computeMotorControl(newMap)
			applyMotorControl(motorControl)
		},

		handleButtonUp: (direction: MotorDirection): void => {
			const newMap = new Map(pressedKeysRef.current)
			newMap.delete(direction)
			pressedKeysRef.current = newMap

			const motorControl = computeMotorControl(newMap)
			applyMotorControl(motorControl)
		},

		isButtonPressed: (direction: MotorDirection): boolean => {
			return pressedKeysRef.current.has(direction)
		}
	}
}
