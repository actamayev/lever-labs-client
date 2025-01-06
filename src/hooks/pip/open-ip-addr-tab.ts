import _ from "lodash"
import { useCallback } from "react"
import usePipStatusPoll from "./pip-status-poll"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import checkInternetConnectivity from "../../utils/pip/check-internet-connectivity"

export default function useOpenIpAddrTab(): () => void {
	const toast = useStyledToast()
	const addPipClass = useAddPipContext()
	const pipStatusPoll = usePipStatusPoll()

	return useCallback(async () => {
		if (_.isNull(addPipClass)) return

		try {
			const hasInternet = await checkInternetConnectivity()

			if (hasInternet) {
				console.info("User still connected to Wi-Fi, not opening Pip connection window")
				addPipClass.store.setIsUserReadyToConnectToPipDialog(false)
				return
			}

			// If we get here, we're likely connected to the Pip's AP
			console.log("No internet connectivity - potentially connected to Pip AP")

			addPipClass.store.setIsUserReadyToConnectToPipDialog(true)
			addPipClass.store.setNewPipConnectionStatus("connecting")

			const newWindow = window.open(
				`http://192.168.4.1/setup?credentials=${addPipClass.store.encodedWifiCredentials}`,
				"_blank",
				"width=400,height=300"
			)

			if (!newWindow) throw new Error("Popup was blocked")

			pipStatusPoll()
		} catch (popupError) {
			console.error("Failed to open setup window:", popupError)
			toast.negative({
				title: `Unable to connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi`,
				description: "Please ensure popups are allowed and try again"
			})
		}
	}, [addPipClass, pipStatusPoll, toast])
}
