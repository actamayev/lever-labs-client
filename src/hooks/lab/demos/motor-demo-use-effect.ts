import isEmpty from "lodash-es/isEmpty"
import { useEffect, useState } from "react"
import useHandleMotorControl from "./handle-motor-control"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"

// Map of equivalent keys to their canonical representation and axis
const keyMappings: Record<string, KeyMapping> = {
	"w": { direction: "up", axis: "vertical", value: 1 },
	"arrowup": { direction: "up", axis: "vertical", value: 1 },
	"s": { direction: "down", axis: "vertical", value: -1 },
	"arrowdown": { direction: "down", axis: "vertical", value: -1 },
	"a": { direction: "left", axis: "horizontal", value: -1 },
	"arrowleft": { direction: "left", axis: "horizontal", value: -1 },
	"d": { direction: "right", axis: "horizontal", value: 1 },
	"arrowright": { direction: "right", axis: "horizontal", value: 1 }
}

const directionToMapping = Object.values(keyMappings).reduce((acc, mapping) => {
	acc[mapping.direction] = mapping
	return acc
}, {} as Record<MotorDirection, KeyMapping>)

export default function useMotorDemoUseEffect(): void {
	const labDemoClass = useLabDemoContext()
	const handleMotorControl = useHandleMotorControl()
	// Store pressed keys with timestamps
	const [pressedKeys, setPressedKeys] = useState<Map<MotorDirection, number>>(new Map())

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return
			const key = event.key.toLowerCase()
			const mapping = keyMappings[key]
			if (!mapping) return
			setPressedKeys((prev) => {
				const newMap = new Map(prev)
				newMap.set(mapping.direction, Date.now()) // Timestamp of keypress
				return newMap
			})
		}

		const handleKeyUp = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return
			const key = event.key.toLowerCase()
			const mapping = keyMappings[key]
			if (!mapping) return
			setPressedKeys((prev) => {
				const newMap = new Map(prev)
				newMap.delete(mapping.direction)
				return newMap
			})
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [labDemoClass, labDemoClass.activeDemoName])

	useEffect(() => {
		// Process pressed keys into vertical and horizontal values
		const motorControl: MotorControlInput = {}

		// Group keys by axis and sort by timestamp to prioritize latest
		const verticalKeys = Array.from(pressedKeys.entries())
			.filter(([dir]) => directionToMapping[dir].axis === "vertical")
			.sort(([, timeA], [, timeB]) => timeA - timeB) // Earliest first

		const horizontalKeys = Array.from(pressedKeys.entries())
			.filter(([dir]) => directionToMapping[dir].axis === "horizontal")
			.sort(([, timeA], [, timeB]) => timeA - timeB) // Earliest first

		// Take the latest key for each axis
		if (verticalKeys.length > 0) {
			const [latestVerticalDir] = verticalKeys[verticalKeys.length - 1]
			motorControl.vertical = directionToMapping[latestVerticalDir].value
		}

		if (horizontalKeys.length > 0) {
			const [latestHorizontalDir] = horizontalKeys[horizontalKeys.length - 1]
			motorControl.horizontal = directionToMapping[latestHorizontalDir].value
		}

		handleMotorControl(motorControl)
	}, [pressedKeys, handleMotorControl])

	useEffect(() => {
		if (labDemoClass.activeDemoName !== "Motor RTC" && !isEmpty(labDemoClass.motorState)) {
			handleMotorControl({})
		}
	}, [labDemoClass.activeDemoName, labDemoClass.motorState, handleMotorControl])
}
