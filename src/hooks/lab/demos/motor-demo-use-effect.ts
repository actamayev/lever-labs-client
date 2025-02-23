import { useEffect, useState } from "react"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import useComputeMotorState from "./compute-motor-state"
import useHandleMotorControl from "./handle-motor-control"

// eslint-disable-next-line max-lines-per-function
export default function useMotorDemoUseEffect(): void {
	const labDemoClass = useLabDemoContext()
	const computeMotorState = useComputeMotorState()
	const handleMotorControl = useHandleMotorControl()
	const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return
			const key = event.key.toLowerCase()
			if (["w", "s", "a", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
				setPressedKeys((prev) => {
					const newSet = new Set(prev)
					newSet.add(key)
					return newSet
				})
			}
		}

		const handleKeyUp = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return
			const key = event.key.toLowerCase()
			if (["w", "s", "a", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
				setPressedKeys((prev) => {
					const newSet = new Set(prev)
					newSet.delete(key)
					return newSet
				})
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [labDemoClass, labDemoClass.activeDemoName])

	useEffect(() => {
		computeMotorState(pressedKeys)
	}, [pressedKeys, computeMotorState])

	useEffect(() => {
		if (labDemoClass.activeDemoName !== "Motor RTC" && labDemoClass.motorState) {
			handleMotorControl(0, 0, pressedKeys)
		}
	}, [labDemoClass.activeDemoName, labDemoClass.motorState, handleMotorControl, pressedKeys])
}
