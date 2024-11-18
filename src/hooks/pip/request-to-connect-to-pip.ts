import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useRequestToConnectToPip(): (
	pipData: PipData
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const pipClass = usePipContext()

	// eslint-disable-next-line complexity
	return useCallback(async (pipData: PipData) => {
		try {
			const foundPip = pipClass.findPipFromUUID(pipData.pipUUID)
			switch (foundPip?.pipConnectionStatus) {
			case "connected": return
			case "connected to other user": {
				notificationsClass.setNegativeNotification("Someone is already connected to this Pip")
				return
			}
			case "inactive": {
				notificationsClass.setNegativeNotification(`Unable to connect: ${pipData.pipName} is not connected to the internet`)
				return
			}
			}
			const connectToPipResponse = await blueDotApiClient.pipDataService.requestToConnectToPip(pipData.pipUUID)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			pipClass.updatePipConnectionStatus({ pipUUID: pipData.pipUUID, newConnectionStatus: "connected" })
			notificationsClass.setPositiveNotification(`Connected to ${pipData.pipName}`)
			pipClass.setSelectedPip(pipData)
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "Someone is already connected to this Pip") {
						notificationsClass.setNegativeNotification("Someone is already connected to this Pip")
						return
					} else if (error.response.data.message === "This Pip is not active/connected to the internet") {
						notificationsClass.setNegativeNotification(
							`Unable to connect: ${pipData.pipName} is not connected to the internet`
						)
						return
					}  else if (error.response.data.message === "User hasn't registered this UUID") {
						notificationsClass.setNegativeNotification("You haven't regsitered this Pip ID")
						return
					}
				}
			}
			notificationsClass.setNegativeNotification(
				`Unable to connect to ${pipData.pipName} at this time. Please reload page and try again.`
			)
		}
	}, [blueDotApiClient.pipDataService, notificationsClass, pipClass])
}
