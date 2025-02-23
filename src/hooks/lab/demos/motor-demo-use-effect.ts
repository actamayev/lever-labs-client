import { useCallback, useEffect, useState } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../../contexts/pip-context"
import useToastOptions from "../../../components/toast-options"
import { useSocketContext } from "../../../contexts/socket-context"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

// eslint-disable-next-line max-lines-per-function
export default function useMotorDemoUseEffect(): void {
	const labDemoClass = useLabDemoContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

	// Handle motor control API call
	const handleMotorControl = useCallback((leftMotor: MotorDirection, rightMotor: MotorDirection): void => {
		if (isNull(blueDotApiClient.httpClient.accessToken)) return

		const isUserAction = pressedKeys.size > 0 || labDemoClass.motorState !== null
		if (!isUserAction) return
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip" })
		}

		// if (pipClass.selectedPip.pipConnectionStatus !== "connected") {
		// 	return toast.negative({ title:`Please connect ${pipClass.selectedPip.pipName} to the internet to begin` })
		// }

		const newMotorState: MotorControl = {
			leftMotor,
			rightMotor,
		}

		// Only make API call if state has changed
		if (isEqual(labDemoClass.motorState, newMotorState)) return
		labDemoClass.setMotorState(newMotorState)
		socketClass.emitMotorControl({
			...newMotorState,
			pipUUID: pipClass.selectedPip.pipUUID
		})
	}, [blueDotApiClient.httpClient.accessToken, labDemoClass, pipClass.selectedPip, pressedKeys.size, socketClass, toast])

	// eslint-disable-next-line complexity
	const computeMotorState = useCallback(() => {
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

		handleMotorControl(left, right)
	}, [pressedKeys, handleMotorControl])

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
	}, [labDemoClass.activeDemoName])

	useEffect(() => {
		computeMotorState()
	}, [pressedKeys, computeMotorState])

	useEffect(() => {
		if (labDemoClass.activeDemoName !== "Motor RTC" && labDemoClass.motorState) {
			handleMotorControl(0, 0)
		}
	}, [labDemoClass.activeDemoName, labDemoClass.motorState, handleMotorControl])
}
