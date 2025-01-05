import _ from "lodash"
import { useCallback } from "react"
import usePipStatusPoll from "./pip-status-poll"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"

export default function useOpenIpAddrTab(): () => void {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const pipStatusPoll = usePipStatusPoll()

	return useCallback(async () => {
		if (_.isNull(addPipClass)) return

		try {
			// Create an AbortController with a timeout
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 1000) // 1 second timeout

			// Try to reach Cloudflare to check internet connectivity
			await fetch("https://cloudflare.com/cdn-cgi/trace", {
				method: "GET",
				cache: "no-cache",
				signal: controller.signal // Add the abort signal to the fetch
			})

			// Clear the timeout if the fetch succeeds
			clearTimeout(timeoutId)

			// If we get here, we're still connected to regular internet
			console.info("User still connected to Wi-Fi, not opening Pip connection window")
			addPipClass.store.setIsUserReadyToConnectToPipDialog(false)
			return

		} catch (error) {
			// Network error means we're likely connected to the Pip's AP
			console.log("Network error - potentially connected to Pip AP:", error)

			try {
				addPipClass.store.setIsUserReadyToConnectToPipDialog(true)
				addPipClass.store.setNewPipConnectionStatus("connecting")

				const newWindow = window.open(
					`http://192.168.4.1/setup?credentials=${addPipClass.store.encodedWifiCredentials}`,
					"_blank",
					"width=400,height=300"
				)

				if (!newWindow) {
					throw new Error("Popup was blocked. Please allow popups for this site and try again.")
				}

				pipStatusPoll()

			} catch (popupError) {
				console.error("Failed to open setup window:", popupError)
				toast.negative({
					title: `Unable to connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi`,
					description: "Please ensure popups are allowed and try again"
				})
			}
		}
	}, [addPipClass, pipStatusPoll, toast])
}
