import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useDisconnectFromPip(): (
	pipData: PipData
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const pipClass = usePipContext()

	return useCallback(async (pipData: PipData) => {
		try {
			const foundPip = pipClass.findPipFromUUID(pipData.pipUUID)
			if (foundPip?.pipConnectionStatus !== "connected") return

			const connectToPipResponse = await blueDotApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Disconnect from Pip failed")
			}
			pipClass.updatePipConnectionStatus({ pipUUID: pipData.pipUUID, newConnectionStatus: "online" })
			notificationsClass.setPositiveNotification(`Disconnected from ${pipData.pipName}`)
			pipClass.setSelectedPipToFirstPip()
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				`Unable to disconnect from ${pipData.pipName} at this time. Please reload page and try again.`
			)
		}
	}, [blueDotApiClient.pipDataService, notificationsClass, pipClass])
}
