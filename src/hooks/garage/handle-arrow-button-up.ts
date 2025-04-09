"use client"

import { useGarageContext } from "../../contexts/garage-context"
import useComputeMotorControl from "./compute-motor-control"
import useApplyMotorControl from "./apply-motor-control"

export default function useHandleArrowButtonUp(): (direction: MotorDirection) => void {
	const garageClass = useGarageContext()
	const computeMotorControl = useComputeMotorControl()
	const applyMotorControl = useApplyMotorControl()

	return (direction: MotorDirection): void => {
		garageClass.removePressedKey(direction)

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}
}
