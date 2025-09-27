"use client"

import isNull from "lodash-es/isNull"
import { MotorControlInput } from "@lever-labs/common-ts/types/garage"
import authClass from "../../classes/auth-class"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import socketClass from "../../classes/socket-class"
import garageClass from "../../classes/garage-class"

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
	currentDirections.forEach((dir): void => {
		if (!newDirections.has(dir)) {
			garageClass.stopDriving(dir)
		}
	})

	// Start directions that are newly active
	newDirections.forEach((dir): void => {
		if (!currentDirections.has(dir)) {
			garageClass.drive(dir)
		}
	})

	// Update current directions
	garageClass.updatePressedDirections(newDirections)

	if (authClass.isFinishedWithSignup === false) return
	const selectedPip = pipClass.selectedPip

	if (pipClass.selectedPip?.pipConnectionStatus === "connected to serial to you") {
		return toastClass.negative({ title: "Please unplug Pip from the computer to drive" })
	}
	if (isNull(selectedPip) || selectedPip.pipConnectionStatus === "offline") {
		return toastClass.negative({ title: "Please connect Pip to the Wi-Fi in order to drive" })
	}

	// Emit motor control via socket
	socketClass.emitToServer("motor-control", {
		motorControl,
		pipUUID: selectedPip.pipUUID,
		motorThrottlePercent: garageClass.motorThrottlePercent
	})
}
