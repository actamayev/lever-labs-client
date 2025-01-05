/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import useStyledToast from "../toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useRetrievePipStatusWhileAdding from "../../hooks/pip/retrieve-pip-status-while-adding"

function ConnectToPipInstructions() {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const retrievePipStatusWhileAdding = useRetrievePipStatusWhileAdding()

	// TODO: After the user's pip connects, it should send a request to the websocket which should notify the client it's connected
	const openIpAddrTab = useCallback(() => {
		const MAX_RETRIES = 10
		const POLLING_INTERVAL = 1000 // 1 second

		try {
			if (_.isNull(addPipClass)) return

			const newWindow = window.open(
				`http://192.168.4.1/setup?credentials=${addPipClass.store.encodedWifiCredentials}`,
				"_blank",
				"width=400,height=300"
			)

			if (!newWindow) {
				throw new Error("Popup was blocked. Please allow popups for this site and try again.")
			}

			// Initialize connection monitoring
			let retryCount = 0
			let pollingInterval: NodeJS.Timeout | null = null

			// Function to clear interval and cleanup
			const cleanup = () => {
				if (pollingInterval) {
					clearInterval(pollingInterval)
					pollingInterval = null
				}
				window.removeEventListener("online", startPolling)
			}

			// The polling function that calls useRetrievePipStatusWhileAdding
			const pollPipStatus = async () => {
				retryCount++

				try {
					await retrievePipStatusWhileAdding()

					// If we've connected or hit max retries, stop polling
					if (addPipClass.store.hasPipConnectedToInternet || retryCount >= MAX_RETRIES) {
						cleanup()
					}
				} catch (error) {
					console.error("Error polling PIP status:", error)
					cleanup()
				}
			}

			// Function to start polling when we're back online
			const startPolling = () => {
				console.log("online?", navigator.onLine)
				if (navigator.onLine && !pollingInterval) {
					pollingInterval = setInterval(pollPipStatus, POLLING_INTERVAL)
				}
			}

			// Listen for when we come back online
			window.addEventListener("online", startPolling)

			// Cleanup if component unmounts
			return () => cleanup()
		} catch (error) {
			console.error("Failed to open setup page:", error)
			toast.negative({
				title: `Unable to connect ${addPipClass?.store.mirroredFormValues.pipName} to Wi-Fi at this time`,
				description: "Please reload page and try again"
			})
		}
	}, [addPipClass, retrievePipStatusWhileAdding, toast])

	if (
		_.isNull(addPipClass) ||
		_.isNull(addPipClass.store.encodedWifiCredentials)
	) return null

	return (
		<div className="my-2">
			<div className="flex flex-col">
				<div>
					Step 4: Send your Wi-Fi credentials to {addPipClass.store.mirroredFormValues.pipName}
				</div>
				<div>
					1. Open your computer&apos;s Wi-Fi settings
				</div>
				<div>
					2. Connect to the Wi-Fi network:&nbsp;
					<span className="font-bold">
						pip-{addPipClass.store.mirroredFormValues.pipUUID}
					</span>
				</div>
				<Button
					type="button"
					className="mt-2"
					onClick={openIpAddrTab}
				>
					Send Wi-Fi credentials
				</Button>
			</div>
		</div>
	)
}

export default observer(ConnectToPipInstructions)
