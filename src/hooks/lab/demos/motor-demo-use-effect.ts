import isEmpty from "lodash-es/isEmpty"
import { useEffect, useRef } from "react"
import useHandleMotorControl from "./handle-motor-control"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"

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
	const pressedKeysRef = useRef<Map<MotorDirection, number>>(new Map())

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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Real-time motor control") return
			const key = event.key.toLowerCase()
			const mapping = keyMappings[key]
			if (!mapping) return

			// Update ref directly
			const newMap = new Map(pressedKeysRef.current)
			newMap.set(mapping.direction, Date.now())
			pressedKeysRef.current = newMap

			// Call motor control with updated map
			handleMotorControl(computeMotorControl(newMap))
		}

		const handleKeyUp = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Real-time motor control") return
			const key = event.key.toLowerCase()
			const mapping = keyMappings[key]
			if (!mapping) return

			// Update ref directly
			const newMap = new Map(pressedKeysRef.current)
			newMap.delete(mapping.direction)
			pressedKeysRef.current = newMap

			// Call motor control with updated map
			handleMotorControl(computeMotorControl(newMap))
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [labDemoClass, labDemoClass.activeDemoName, handleMotorControl])

	useEffect(() => {
		if (
			labDemoClass.activeDemoName !== "Real-time motor control" &&
			!isEmpty(labDemoClass.motorState)
		) {
			handleMotorControl({ vertical: 0, horizontal: 0 })
		}
	}, [labDemoClass.activeDemoName, labDemoClass.motorState, handleMotorControl])
}
