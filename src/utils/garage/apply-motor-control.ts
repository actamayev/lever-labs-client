"use client"

import isNull from "lodash-es/isNull"
import { MotorControlInput } from "@bluedotrobots/common-ts/types/garage"
import getAuthClass from "../../classes/auth-class"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import getSocketClass from "../../classes/socket-class"
import getGarageClass from "../../classes/garage-class"

// Map motor control values to drive directions
const motorControlToDriveDirections = (motorControl: { vertical: number, horizontal: number }): Set<DriveDirection> => {
	const directions = new Set<DriveDirection>()

	if (motorControl.vertical > 0) directions.add("forward")
	else if (motorControl.vertical < 0) directions.add("backward")

	if (motorControl.horizontal > 0) directions.add("right")
	else if (motorControl.horizontal < 0) directions.add("left")

	return directions
}

export default function applyMotorControl(motorControl: MotorControlInput, forceEmit?: boolean) : void {
	const throttleChanged = getGarageClass().lastThrottlePercent !== getGarageClass().motorThrottlePercent

	// Skip if no change in motor control and throttle hasn't changed, unless forced
	if (
		!forceEmit &&
		!throttleChanged &&
		motorControl.vertical === getGarageClass().motorState.vertical &&
		motorControl.horizontal === getGarageClass().motorState.horizontal
	) {
		return
	}

	// Update GarageClass state
	getGarageClass().setMotorState(motorControl)

	// 1. Update garage using drive directions
	const newDirections = motorControlToDriveDirections(motorControl)
	const currentDirections = getGarageClass().pressedDirections

	// Stop directions that are no longer active
	currentDirections.forEach((dir): void => {
		if (!newDirections.has(dir)) {
			getGarageClass().stopDriving(dir)
		}
	})

	// Start directions that are newly active
	newDirections.forEach((dir): void => {
		if (!currentDirections.has(dir)) {
			getGarageClass().drive(dir)
		}
	})

	// Update current directions
	getGarageClass().updatePressedDirections(newDirections)

	if (getAuthClass().isFinishedWithSignup === false) return

	if (isNull(getPipClass().selectedPip)) {
		return getToastClass().negative({ title: "Please add a Pip" })
	}
	if (getPipClass().selectedPip.pipConnectionStatus === "offline") {
		return getToastClass().negative({ title: `Please connect ${getPipClass().selectedPip.pipName} to the internet` })
	}

	// Emit motor control via socket
	getSocketClass().emitToServer("motor-control", {
		motorControl,
		pipUUID: getPipClass().selectedPip.pipUUID,
		motorThrottlePercent: getGarageClass().motorThrottlePercent
	})
}
