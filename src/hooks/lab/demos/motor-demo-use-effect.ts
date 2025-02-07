import { useCallback, useEffect } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../../contexts/pip-context"
import { isErrorResponses } from "../../../utils/type-checks"
import useToastOptions from "../../../components/toast-options"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

export default function useMotorDemoUseEffect(): void {
	const labDemoClass = useLabDemoContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()
	const pipClass = usePipContext()

	// Handle motor control API call
	const handleMotorControl = useCallback(async (leftMotor: MotorDirection, rightMotor: MotorDirection): Promise<void> => {
		try {
			if (isNull(blueDotApiClient.httpClient.accessToken)) return

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

			const motorControlResponse = await blueDotApiClient.labDemoDataService.motorControl(
				{...newMotorState, pipUUID: pipClass.selectedPip.pipUUID}
			)
			if (!isEqual(motorControlResponse.status, 200) || isErrorResponses(motorControlResponse.data)) {
				throw Error("Unable to control motors")
			}
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Error motor control",
				description: "Failed to control motors"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.labDemoDataService, labDemoClass, pipClass.selectedPip, toast])

	// Handle keydown events
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return

			switch (event.key.toLowerCase()) {
			case "w":
			case "arrowup":
				void handleMotorControl(1, 1) // Forward
				break
			case "s":
			case "arrowdown":
				void handleMotorControl(-1, -1) // Backward
				break
			case "a":
			case "arrowleft":
				void handleMotorControl(-1, 1) // Left turn
				break
			case "d":
			case "arrowright":
				void handleMotorControl(1, -1) // Right turn
				break
			}
		}

		// Handle keyup events - stop motors
		const handleKeyUp = (event: KeyboardEvent): void => {
			if (labDemoClass.activeDemoName !== "Motor RTC") return

			const key = event.key.toLowerCase()
			if (["w", "s", "a", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
				void handleMotorControl(0, 0) // Stop both motors
			}
		}

		// Add event listeners
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		// Cleanup
		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [labDemoClass.activeDemoName, pipClass.selectedPip, blueDotApiClient.httpClient.accessToken, handleMotorControl])

	// Reset motors when demo is deactivated
	useEffect(() => {
		if (labDemoClass.activeDemoName !== "Motor RTC" && !isNull(labDemoClass.motorState)) {
			void handleMotorControl(0, 0)
		}
	}, [handleMotorControl, labDemoClass.activeDemoName, labDemoClass.motorState])
}
