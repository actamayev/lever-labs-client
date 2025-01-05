/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash"
import { useCallback } from "react"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useRetrievePipStatusWhileAdding from "./retrieve-pip-status-while-adding"

export default function usePipStatusPoll(): () => void {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const retrievePipStatusWhileAdding = useRetrievePipStatusWhileAdding()

	return useCallback(() => {
		if (_.isNull(addPipClass)) return

		const MAX_RETRIES = 10
		const POLLING_INTERVAL = 1000
		let retryCount = 0
		let pollingInterval: NodeJS.Timeout | null = null

		const cleanup = (shouldMarkAsFailed: boolean = false): void => {
			if (pollingInterval) {
				clearInterval(pollingInterval)
				pollingInterval = null
			}
			if (shouldMarkAsFailed) {
				addPipClass.store.setHasPipConnectedToInternet("failed")
			}
			window.removeEventListener("online", startPolling)
		}

		const startPolling = (): void => {
			console.log("Checking internet connectivity...")
			if (pollingInterval) return

			// First interval to check Cloudflare
			pollingInterval = setInterval(async () => {
				try {
					// Try to check real internet connectivity
					const response = await fetch("https://cloudflare.com/cdn-cgi/trace", {
						method: "GET",
						cache: "no-cache"
					})

					if (!response.ok) {
						console.log("No internet connectivity - just wifi")
						return
					}

					// Clear the Cloudflare checking interval
					if (pollingInterval) {
						clearInterval(pollingInterval)
					}

					// Start the PIP status polling
					pollingInterval = setInterval(async () => {
						retryCount++

						try {
							await retrievePipStatusWhileAdding()

							if (addPipClass.store.hasPipConnectedToInternet) {
								cleanup(false)
								return
							}

							if (retryCount >= MAX_RETRIES) {
								cleanup(true)
								toast.negative({
									title: `Unable to connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi`,
									description: "Maximum connection attempts reached. Please try again."
								})
								throw new Error("Max retries reached")
							}
						} catch (error) {
							console.error("Error polling PIP status:", error)
							cleanup(true)
							throw error
						}
					}, POLLING_INTERVAL)

				} catch (error) {
					console.log("Failed to verify internet connectivity:", error)
					return
				}
			}, POLLING_INTERVAL)
		}
		window.addEventListener("online", startPolling)
		startPolling()
	}, [addPipClass, retrievePipStatusWhileAdding, toast])
}
