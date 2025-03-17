"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../../contexts/pip-context"
import useToastOptions from "../../../components/toast-options"
import { useSocketContext } from "../../../contexts/socket-context"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

export default function useHandleMotorControl(): (motorControl: MotorControlInput) => void {
	const blueDotApiClient = useApiClientContext()
	const labDemoClass = useLabDemoContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const socketClass = useSocketContext()

	return useCallback((motorControl: MotorControlInput): void => {
		if (isNull(blueDotApiClient.httpClient.accessToken)) return

		if (!labDemoClass.activeDemoName) return
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip" })
		}

		if (pipClass.selectedPip.pipConnectionStatus === "inactive") {
			return toast.negative({ title: `Please connect ${pipClass.selectedPip.pipName} to the internet` })
		}
		// Only emit if state has changed
		if (isEqual(labDemoClass.motorState, motorControl)) return
		labDemoClass.setMotorState(motorControl) // Update to handle object instead of Set
		socketClass.emitMotorControl({
			motorControl,
			pipUUID: pipClass.selectedPip.pipUUID
		})
	}, [blueDotApiClient.httpClient.accessToken, labDemoClass, pipClass.selectedPip, socketClass, toast])
}
