"use client"

import { MotorControlInput } from "@actamayev/lever-labs-common-ts/types/garage"
import garageClass from "../../classes/garage-class"
import { motorKeyMappings } from "../constants/constants"

const directionToMapping = Object.values(motorKeyMappings).reduce((acc, mapping): Record<MotorDirection, MotorDriveKeyMapping> => {
	acc[mapping.direction] = mapping
	return acc
}, {} as Record<MotorDirection, MotorDriveKeyMapping>)

export default function computeMotorControl(): MotorControlInput {
	// Compute motor control values based on pressed keys
	const motorControl: MotorControlInput = { vertical: 0, horizontal: 0 }
	const keys = garageClass.pressedMotorKeys

	const verticalKeys = Array.from(keys.entries())
		.filter(([dir]): boolean => directionToMapping[dir].axis === "vertical")
		.sort(([, timeA], [, timeB]): number => timeA - timeB)

	const horizontalKeys = Array.from(keys.entries())
		.filter(([dir]): boolean => directionToMapping[dir].axis === "horizontal")
		.sort(([, timeA], [, timeB]): number => timeA - timeB)

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
