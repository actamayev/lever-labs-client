/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash"
import { useCallback } from "react"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useRetrievePipStatusWhileAdding from "./retrieve-pip-status-while-adding"
import checkInternetConnectivity from "../../utils/pip/check-internet-connectivity"

export default function usePipStatusPoll(): () => void {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const retrievePipStatusWhileAdding = useRetrievePipStatusWhileAdding()

	return useCallback(() => {
		if (_.isNull(addPipClass)) return

		const POLLING_INTERVAL = 1000 // 1 second
		const GOOGLE_TIMEOUT = 20000 // 20 seconds
		const PIP_STATUS_TIMEOUT = 20000 // 20 seconds

		// Calculate retries based on timeouts
		const GOOGLE_MAX_RETRIES = Math.ceil(GOOGLE_TIMEOUT / POLLING_INTERVAL) // 20 retries
		const PIP_STATUS_MAX_RETRIES = Math.ceil(PIP_STATUS_TIMEOUT / POLLING_INTERVAL) // 20 retries

		let googleRetryCount = 0
		let pipStatusRetryCount = 0
		let pollingInterval: NodeJS.Timeout | null = null

		const cleanup = (shouldMarkAsFailed: boolean): void => {
			if (pollingInterval) {
				clearInterval(pollingInterval)
				pollingInterval = null
			}
			if (shouldMarkAsFailed) {
				addPipClass.store.setNewPipConnectionStatus("failed")
			}
			window.removeEventListener("online", startPolling)
		}

		const startPolling = (): void => {
			if (pollingInterval) return

			// First phase: Check for internet connectivity
			// The GOOGLE_TIMEOUT has to do with checking for internet connectivity after the Pip kicks the user off it's AP.
			// The user should be back on their network in GOOGLE_TIMEOUT seconds.
			// This cannot be made infinite in the event that the Pip didn't kick off the user
			// (ie. when the provided credentials were invalid)
			pollingInterval = setInterval(async () => {
				googleRetryCount++

				// Check if we've exceeded the Google timeout
				if (googleRetryCount >= GOOGLE_MAX_RETRIES) {
					cleanup(true)
					return toast.negative({
						title: `We couldn't connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi.`,
						description: "Please check if your Wi-Fi name and password are entered correctly."
					})
				}

				const hasInternet = await checkInternetConnectivity()

				if (!hasInternet) {
					return console.info(`No internet connectivity - attempt ${googleRetryCount}/${GOOGLE_MAX_RETRIES}`)
				}

				// Clear the Google checking interval
				if (pollingInterval) {
					clearInterval(pollingInterval)
				}

				// Second phase: Check PIP status
				// The PIP_STATUS_TIMEOUT timeout has to do with the time necessary for the users computer to auto-reconnect to their Wi-Fi
				// (after getting kicked off Pip's)
				pollingInterval = setInterval(async () => {
					pipStatusRetryCount++

					try {
						await retrievePipStatusWhileAdding()

						if (addPipClass.store.newPipConnectionStatus === "connected") {
							return cleanup(false)
						}

						if (pipStatusRetryCount >= PIP_STATUS_MAX_RETRIES) {
							cleanup(true)
							return toast.negative({
								title: `Unable to connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi`,
								description: "Maximum connection attempts reached. Please try again."
							})
						}

						console.info(`Checking PIP status - attempt ${pipStatusRetryCount}/${PIP_STATUS_MAX_RETRIES}`)
					} catch (error) {
						console.error("Error polling PIP status:", error)
						cleanup(true)
						throw error
					}
				}, POLLING_INTERVAL)

			}, POLLING_INTERVAL)
		}

		window.addEventListener("online", startPolling)
		startPolling()
	}, [addPipClass, retrievePipStatusWhileAdding, toast])
}
