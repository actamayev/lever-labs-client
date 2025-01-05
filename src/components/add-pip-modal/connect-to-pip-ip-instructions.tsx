/* eslint-disable max-lines-per-function */
import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import useStyledToast from "../toast-options"
import usePipStatusPoll from "../../hooks/pip/pip-status-poll"
import { useAddPipContext } from "../../contexts/add-pip-context"

function ConnectToPipInstructions() {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const pipStatusPoll = usePipStatusPoll()

	const openIpAddrTab = useCallback(async () => {
		if (_.isNull(addPipClass)) return

		try {
			// Try to reach Cloudflare to check internet connectivity
			await fetch("https://cloudflare.com/cdn-cgi/trace", {
				method: "GET",
				cache: "no-cache"
			})

			// If we get here, we're still connected to regular internet
			console.info("User still connected to Wi-Fi, not opening Pip connection window")
			addPipClass.store.setIsUserReadyToConnectToPipDialog(false)
			toast.negative({
				title: `Please connect to Pip's Wi-Fi (pip-${addPipClass.store.mirroredFormValues.pipUUID}).`,
				description: "You are not currently connected"
			})
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
				{addPipClass.store.newPipConnectionStatus !== "connected" && (
					<Button
						type="button"
						className="mt-2"
						onClick={openIpAddrTab}
					>
						Send Wi-Fi credentials
					</Button>
				)}
			</div>
		</div>
	)
}

export default observer(ConnectToPipInstructions)
