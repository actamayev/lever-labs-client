"use client"

import { motorKeyMappings } from "../../utils/constants"
import { useGarageContext } from "../../contexts/garage-context"
import { MotorControlInput } from "@bluedotrobots/common-ts"

const directionToMapping = Object.values(motorKeyMappings).reduce((acc, mapping) => {
	acc[mapping.direction] = mapping
	return acc
}, {} as Record<MotorDirection, MotorDriveKeyMapping>)

export default function useComputeMotorControl(): () => MotorControlInput {
	const garageClass = useGarageContext()

	// Compute motor control values based on pressed keys
	return (): MotorControlInput => {
		const motorControl: MotorControlInput = { vertical: 0, horizontal: 0 }
		const keys = garageClass.pressedMotorKeys

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
}
