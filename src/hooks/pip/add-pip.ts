import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import validatePipData from "../../utils/pip-data-validation"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(): (
	pipData: IncompletePipData,
	toggleModalOpen: () => void
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const pipClass = usePipContext()

	return useCallback(async (
		pipData: IncompletePipData,
		toggleModalOpen: () => void
	) => {
		try {
			if (
				validatePipData(pipData) === false ||
				pipClass.checkIfUUIDAlreadyExists(pipData.pipUUID) === true
			) return
			const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(pipData)

			if (!_.isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			toggleModalOpen()
			pipClass.addNewPip({
				userPipUUIDId: addPipDataResponse.data.userPipUUIDId,
				// TODO: Should also return the pipConnection status from the backend (if the pip has already been connected to wifi)
				pipConnectionStatus: "inactive",
				...pipData
			})
			notificationsClass.setPositiveNotification(`${pipData.pipName} added`)
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "User already registered this Pip UUID") {
						notificationsClass.setNegativeNotification("You have a Pip with this ID")
						return
					} else if (error.response.data.message === "Pip UUID doesn't exist") {
						notificationsClass.setNegativeNotification("The Pip ID you entered does not exist")
						return
					}
				}
			}
			notificationsClass.setNegativeNotification(`Unable to add ${pipData.pipName} at this time. Please reload page and try again.`)
		}
	}, [blueDotApiClient.pipDataService, notificationsClass, pipClass])
}
