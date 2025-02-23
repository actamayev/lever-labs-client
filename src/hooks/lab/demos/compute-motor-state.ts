import { useCallback } from "react"
import useHandleMotorControl from "./handle-motor-control"

export default function useComputeMotorState(): (
	pressedKeys: Set<string>
) => void {
	const handleMotorControl = useHandleMotorControl()

	// eslint-disable-next-line complexity
	return useCallback((pressedKeys: Set<string>) => {
		let left: MotorDirection = 0
		let right: MotorDirection = 0

		if (pressedKeys.has("w") || pressedKeys.has("arrowup")) {
			left = 1
			right = 1
		}
		if (pressedKeys.has("s") || pressedKeys.has("arrowdown")) {
			left = -1
			right = -1
		}
		if (pressedKeys.has("a") || pressedKeys.has("arrowleft")) {
			left = -1
			right = 1
		}
		if (pressedKeys.has("d") || pressedKeys.has("arrowright")) {
			left = 1
			right = -1
		}

		// Combine movements: prioritize forward/backward, adjust with turns
		if (pressedKeys.size > 1) {
			const forward = pressedKeys.has("w") || pressedKeys.has("arrowup")
			const backward = pressedKeys.has("s") || pressedKeys.has("arrowdown")
			const leftTurn = pressedKeys.has("a") || pressedKeys.has("arrowleft")
			const rightTurn = pressedKeys.has("d") || pressedKeys.has("arrowright")

			if (forward && rightTurn) {
				left = 1
				right = 0 // Forward-right: full left, stop right
			} else if (forward && leftTurn) {
				left = 0
				right = 1 // Forward-left: stop left, full right
			} else if (backward && rightTurn) {
				left = -1
				right = 0 // Backward-right
			} else if (backward && leftTurn) {
				left = 0
				right = -1 // Backward-left
			}
		}

		handleMotorControl(left, right, pressedKeys)
	}, [handleMotorControl])
}
