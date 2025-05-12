"use client"

import { useEffect } from "react"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import usePollSensors from "./poll-sensors"
import { SENSOR_POLLING_INTERVAL } from "../../utils/constants"

export default function useSensorPollingUseEffect (): void {
	const serialManager = useSerialManagerContext()
	const pollSensors = usePollSensors()

	// Setup event listeners for user activity
	useEffect(() => {
		if (!serialManager.connected) return

		const handleActivity = (): void => {
			serialManager.markUserActivity()
		}

		// Add event listeners for mouse and keyboard activity
		window.addEventListener("mousemove", handleActivity)
		window.addEventListener("mousedown", handleActivity)
		window.addEventListener("keydown", handleActivity)
		window.addEventListener("touchstart", handleActivity)
		window.addEventListener("scroll", handleActivity)

		// Cleanup event listeners
		return (): void => {
			window.removeEventListener("mousemove", handleActivity)
			window.removeEventListener("mousedown", handleActivity)
			window.removeEventListener("keydown", handleActivity)
			window.removeEventListener("touchstart", handleActivity)
			window.removeEventListener("scroll", handleActivity)
		}
	}, [serialManager, serialManager.connected])

	// Setup interval to check for activity and send polling extension
	useEffect(() => {
		if (!serialManager.connected) return

		const interval = setInterval(() => {
			// Check if there was activity during this 30-second interval
			const hadActivity = serialManager.checkAndResetUserActivity()

			if (hadActivity) {
				void pollSensors()
			}
		}, SENSOR_POLLING_INTERVAL) // Check every 30 seconds

		return (): void => clearInterval(interval)
	}, [pollSensors, serialManager, serialManager.connected])
}
