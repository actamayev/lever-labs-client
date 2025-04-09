"use client"

import { keyMappings } from "../../utils/constants"
import { useGarageContext } from "../../contexts/garage-context"

const directionToMapping = Object.values(keyMappings).reduce((acc, mapping) => {
	acc[mapping.direction] = mapping
	return acc
}, {} as Record<GarageControls, KeyMapping>)

export default function useComputeMotorControl(): () => MotorControlInput {
	const garageClass = useGarageContext()

	// Compute motor control values based on pressed keys
	return (): MotorControlInput => {
		const motorControl: MotorControlInput = { vertical: 0, horizontal: 0 }
		const keys = garageClass.pressedKeys

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
