import _ from "lodash"
import { useCallback } from "react"
import { Button } from "../../components/shadcn/ui/button"
import { usePipContext } from "../../contexts/pip-context"
import useStyledToast from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import useRequestToConnectToPip from "./request-to-connect-to-pip"
import { ToastActionElement } from "../../components/shadcn/ui/toast"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useDisconnectFromPip(): (
	pipData: PipData
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const toast = useStyledToast()
	const requestToConnectToPip = useRequestToConnectToPip()

	return useCallback(async (pipData: PipData) => {
		try {
			const foundPip = pipClass.findPipFromUUID(pipData.pipUUID)
			if (foundPip?.pipConnectionStatus !== "connected") {
				return toast.neutral({
					title: "Unable to disconnect from Pip",
					description: "You're not currently connected to this Pip. Please reload page and try again."
				})
			}

			const connectToPipResponse = await blueDotApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Disconnect from Pip failed")
			}
			pipClass.updatePipConnectionStatus({ pipUUID: pipData.pipUUID, newConnectionStatus: "online" })
			const actionElement = (
				<Button
					onClick={() => requestToConnectToPip(pipData.pipUUID)}
					className="bg-white hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-black dark:text-white"
				>
					Reconnect
				</Button>
				) as ToastActionElement

			toast.positive({
				description: `Disconnected from ${pipData.pipName}`,
				action: actionElement
			})
			pipClass.setSelectedPipToFirstPip()
		} catch (error) {
			console.error(error)
			toast.negative({
				title: `Unable to disconnect from ${pipData.pipName} at this time`,
				description: "Please reload page and try again"
			})
		}
	}, [blueDotApiClient.pipDataService, pipClass, requestToConnectToPip, toast])
}
