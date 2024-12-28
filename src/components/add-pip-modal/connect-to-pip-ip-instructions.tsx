import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import useStyledToast from "../toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"

function ConnectToPipInstructions() {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()

	// TODO: After the user's pip connects, it should send a request to the websocket which should notify the client it's connected
	const openIpAddrTab = useCallback(() => {
		try {
			if (_.isNull(addPipClass)) return
			const newWindow = window.open(`http://192.168.4.1/setup?credentials=${addPipClass.store.encodedWifiCredentials}`, "_blank")
			if (!newWindow) {
				throw new Error("Popup was blocked. Please allow popups for this site and try again.")
			}
		} catch (error) {
			console.error("Failed to open setup page:", error)
			toast.negative({
				title: `Unable to connect ${addPipClass?.store.mirroredFormValues.pipName} to Wi-Fi at this time`,
				description: "Please reload page and try again"
			})
		}
	}, [addPipClass, toast])

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
