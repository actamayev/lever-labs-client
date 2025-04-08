"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../../contexts/pip-context"
import useToastOptions from "../../../components/toast-options"
import { useSocketContext } from "../../../contexts/socket-context"
import { useGarageContext } from "../../../contexts/garage-context"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

// TODO: Delete this hook and anywhere it's used
export default function useHandleMotorControl(): (motorControl: MotorControlInput) => void {
	const blueDotApiClient = useApiClientContext()
	const labDemoClass = useLabDemoContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const socketClass = useSocketContext()
	const garageClass = useGarageContext()

	return useCallback((motorControl: MotorControlInput): void => {
		if (isNull(blueDotApiClient.httpClient.accessToken)) return

		if (!labDemoClass.activeDemoName) return
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip" })
		}

		if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return toast.negative({ title: `Please connect ${pipClass.selectedPip.pipName} to the internet` })
		}
		// Only emit if state has changed
		if (isEqual(labDemoClass.motorState, motorControl)) return
		labDemoClass.setMotorState(motorControl) // Update to handle object instead of Set
		socketClass.emitMotorControl({
			motorControl,
			pipUUID: pipClass.selectedPip.pipUUID,
			motorThrottlePercent: garageClass.motorThrottlePercent
		})
	}, [blueDotApiClient.httpClient.accessToken, garageClass.motorThrottlePercent, labDemoClass, pipClass.selectedPip, socketClass, toast])
}
