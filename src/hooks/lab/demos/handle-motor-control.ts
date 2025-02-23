import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../../contexts/pip-context"
import useToastOptions from "../../../components/toast-options"
import { useSocketContext } from "../../../contexts/socket-context"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

export default function useHandleMotorControl(): (
	leftMotor: MotorDirection,
	rightMotor: MotorDirection,
	pressedKeys: Set<string>
) => void {
	const blueDotApiClient = useApiClientContext()
	const labDemoClass = useLabDemoContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const socketClass = useSocketContext()

	return useCallback((
		leftMotor: MotorDirection,
		rightMotor: MotorDirection,
		pressedKeys: Set<string>
	): void => {
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
	}, [blueDotApiClient.httpClient.accessToken, labDemoClass, pipClass.selectedPip, socketClass, toast])
}
