import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useDisconnectFromPip(): (
	pipData: PipData
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()

	return useCallback(async (pipData: PipData) => {
		try {
			const foundPip = pipClass.findPipFromUUID(pipData.pipUUID)
			if (foundPip?.pipConnectionStatus !== "connected") {
				return toast.neutral({
					title: "Unable to disconnect from Pip",
					description: "Looks like you're not currently connected to this Pip. Please reload the page and try again"
				})
			}

			const connectToPipResponse = await blueDotApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

			if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Disconnect from Pip failed")
			}
			pipClass.updatePipConnectionStatus({ pipUUID: pipData.pipUUID, newConnectionStatus: "online" })
			pipClass.setSelectedPipToFirstPip()
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: `Unable to disconnect from ${pipData.pipName} at this time`,
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.pipDataService, pipClass, toast])
}
