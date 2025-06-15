"use client"

import isNull from "lodash-es/isNull"
import { usePipContext } from "../../classes/pip-context"
import useToastOptions from "../../components/toast-options"
import { useSocketContext } from "../../classes/socket-context"
import { useGarageContext } from "../../classes/garage-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { MotorControlInput } from "@bluedotrobots/common-ts"

// eslint-disable-next-line max-lines-per-function
export default function useApplyMotorControl(): (motorControl: MotorControlInput, forceEmit?: boolean) => void {
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()
	
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
	return (motorControl: MotorControlInput, forceEmit: boolean = false): void => {
		const throttleChanged = garageClass.lastThrottlePercent !== garageClass.motorThrottlePercent

		// Skip if no change in motor control and throttle hasn't changed, unless forced
		if (
			!forceEmit &&
			!throttleChanged &&
			motorControl.vertical === garageClass.motorState.vertical &&
			motorControl.horizontal === garageClass.motorState.horizontal
		) {
			return
		}

		// Update GarageClass state
		garageClass.setMotorState(motorControl)

		// 1. Update garage using drive directions
		const newDirections = motorControlToDriveDirections(motorControl)
		const currentDirections = garageClass.pressedDirections

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
		garageClass.updatePressedDirections(newDirections)

		if (isNull(blueDotApiClientClass.httpClient.accessToken)) return

		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip" })
		}
		if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return toast.negative({ title: `Please connect ${pipClass.selectedPip.pipName} to the internet` })
		}

		// Emit motor control via socket
		socketClass.emitMotorControl({
			motorControl,
			pipUUID: pipClass.selectedPip.pipUUID,
			motorThrottlePercent: garageClass.motorThrottlePercent
		})
	}
}
