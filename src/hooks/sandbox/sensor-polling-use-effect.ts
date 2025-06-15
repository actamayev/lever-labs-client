"use client"

import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import usePollSensors from "./poll-sensors"
import pipClass from "../../classes/pip-class"
import { SENSOR_POLLING_INTERVAL } from "../../utils/constants"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function useSensorPollingUseEffect (): void {
	const pollSensors = usePollSensors()

	// Setup event listeners for user activity
	useEffect(() => {
		if (
			!serialConnectionManagerClass.connected &&
			(isNull(pipClass.selectedPip) || pipClass.selectedPip.pipConnectionStatus === "offline")
		) return

		const handleActivity = (): void => {
			serialConnectionManagerClass.markUserActivity()
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
	}, [])

	// Setup interval to check for activity and send polling extension
	useEffect(() => {
		if (
			!serialConnectionManagerClass.connected &&
			(isNull(pipClass.selectedPip) || pipClass.selectedPip.pipConnectionStatus === "offline")
		) return

		const interval = setInterval(() => {
			// Check if there was activity during this 30-second interval
			const hadActivity = serialConnectionManagerClass.checkAndResetUserActivity()

			if (hadActivity) {
				void pollSensors()
			}
		}, SENSOR_POLLING_INTERVAL) // Check every 30 seconds

		return (): void => clearInterval(interval)
	}, [pollSensors])
}
