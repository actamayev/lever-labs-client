import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import useValidatePipData from "./validate-pip-data"
import { usePipContext } from "../../contexts/pip-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(): (
	pipData: IncompletePipData,
	toggleModalOpen: () => void,
	isPipNameNeeded: boolean,
	doesPipUUIDExist: boolean
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const pipClass = usePipContext()
	const validatePipData = useValidatePipData()

	// eslint-disable-next-line complexity
	return useCallback(async (
		pipData: IncompletePipData,
		toggleModalOpen: () => void,
		isPipNameNeeded: boolean,
		doesPipUUIDExist: boolean
	) => {
		try {
			console.log(validatePipData(pipData, doesPipUUIDExist, isPipNameNeeded))
			if (validatePipData(pipData, doesPipUUIDExist, isPipNameNeeded) === false) return
			if (pipClass.checkIfUUIDAlreadyExists(pipData.pipUUID) === true) {
				throw new Error("You've already added a Pip with this ID")
			}

			if (_.isEmpty(pipData.pipName)) delete pipData.pipName

			const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(pipData)

			if (!_.isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			toggleModalOpen()
			const pipDataToAdd: PipData = {
				pipName: pipData.pipName || addPipDataResponse.data.pipName,
				pipUUID: pipData.pipUUID,
				userPipUUIDId: addPipDataResponse.data.userPipUUIDId,
				pipConnectionStatus: addPipDataResponse.data.pipConnectionStatus
			}
			pipClass.addNewPip(pipDataToAdd)
			notificationsClass.setPositiveNotification(`${pipData.pipName || addPipDataResponse.data.pipName} added`)
		} catch (error) {
			console.error(error)
			if (error instanceof Error && error.message === "You've already added a Pip with this ID") {
				notificationsClass.setNegativeNotification("You've already added a Pip with this ID")
				return
			} else if (error instanceof AxiosError) {
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
	}, [blueDotApiClient.pipDataService, notificationsClass, pipClass, validatePipData])
}
