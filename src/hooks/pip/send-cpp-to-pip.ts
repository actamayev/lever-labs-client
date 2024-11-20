import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSendCppToPip(): (
	pipUUID: PipUUID,
	cppCode: string
) => Promise<void> {
	const pipClass = usePipContext()
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()

	return useCallback(async (
		pipUUID: PipUUID,
		cppCode: string
	) => {
		try {
			if (pipClass.isSendingCppToPip === true) return
			pipClass.setIsSendingCppToPip(true)

			const connectToPipResponse = await blueDotApiClient.pipDataService.sendCppToPip(pipUUID, cppCode)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			notificationsClass.setPositiveNotification("Code sent to Pip")
		} catch (error) {
			console.error(error)
			notificationsClass.setNegativeNotification(
				"Unable to upload code to Pip at this time. Please reload page and try again."
			)
		} finally {
			pipClass.setIsSendingCppToPip(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blueDotApiClient.pipDataService, notificationsClass, pipClass.isSendingCppToPip])
}
