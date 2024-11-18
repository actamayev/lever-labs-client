import _ from "lodash"
import { useCallback } from "react"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSendCppToPip(): (
	pipUUID: PipUUID,
	cppCode: string
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		pipUUID: PipUUID,
		cppCode: string
	) => {
		try {
			const connectToPipResponse = await blueDotApiClient.pipDataService.sendCppToPip(pipUUID, cppCode)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			// pipClass.updatePipConnectionStatus({ pipUUID: pipUUID, newConnectionStatus: "connected" })
			notificationsClass.setPositiveNotification("Code sent to Pip")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				"Unable to upload code to Pip at this time. Please reload page and try again."
			)
		}
	}, [blueDotApiClient.pipDataService, notificationsClass])
}
