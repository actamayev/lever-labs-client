import _ from "lodash"
import { useCallback } from "react"
import usePipStatusPoll from "./pip-status-poll"
import useToastOptions from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import checkInternetConnectivity from "../../utils/pip/check-internet-connectivity"

export default function useOpenIpAddrTab(): () => void {
	const toast = useToastOptions()
	const addPipClass = useAddPipContext()
	const pipStatusPoll = usePipStatusPoll()

	return useCallback(async () => {
		if (_.isNull(addPipClass)) return

		try {
			const connectedToInternet = await checkInternetConnectivity()

			if (connectedToInternet) {
				console.info("Still connected to internet, user needs to connect to ESP AP first")
				addPipClass.store.setIsUserReadyToConnectToPipDialog(false)
				return toast.neutral({
					title: "Wi-Fi connection required",
					description: `Please connect to the pip-${addPipClass.store.mirroredFormValues.pipUUID} network first`
				})
			}
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
			return toast.negative({
				title: `We couldn't connect ${addPipClass.store.mirroredFormValues.pipName} to Wi-Fi`,
				description: "Please ensure popups are allowed and try again"
			})
		}
	}, [addPipClass, pipStatusPoll, toast])
}
