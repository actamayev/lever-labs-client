import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import useValidatePipData from "./validate-pip-data"
import { usePipContext } from "../../contexts/pip-context"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useAutoCloseModalAfterAddPip from "./auto-close-modal-after-add-pip"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(shouldAutoCloseModal: boolean): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useStyledToast()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const validatePipData = useValidatePipData()
	const autoCloseModalAfterAddPip = useAutoCloseModalAfterAddPip()

	// eslint-disable-next-line complexity
	return useCallback(async () => {
		try {
			if (_.isNull(addPipClass)) return
			const { pipUUID, pipName, shouldAutoConnect } = addPipClass.store.mirroredFormValues as {
				pipUUID: PipUUID, pipName: string, shouldAutoConnect: boolean
			}
			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				return toast.negative({
					title: "Unable to add Pip ID",
					description: "You've already added a Pip with this ID"
				})
			}

			if (validatePipData() === false) {
				return toast.negative({
					title: "Unable to validate Pip data",
					description: "Please enter data and try submitting again"
				})
			}

			if (_.isEmpty(pipName)) addPipClass.form.setValue("pipName", undefined)
			if (!addPipClass.store.addingNewPipRequirements.isPipOnline) {
				addPipClass.form.setValue("shouldAutoConnect", false)
			}
			const dataToSend: AddPipData = {
				pipUUID,
				pipName,
				shouldAutoConnect,
			}

			const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(dataToSend)

			if (!_.isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			const pipDataToAdd: PipData = {
				pipName: pipName || addPipDataResponse.data.pipName,
				pipUUID: pipUUID,
				userPipUUIDId: addPipDataResponse.data.userPipUUIDId,
				pipConnectionStatus: addPipDataResponse.data.pipConnectionStatus
			}
			pipClass.addNewPip(pipDataToAdd)
			if (shouldAutoCloseModal) {
				autoCloseModalAfterAddPip(shouldAutoCloseModal)
			}
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "User already registered this Pip UUID") {
						toast.negative({
							title: "Unable to add Pip ID",
							description: "You have a Pip with this ID"
						})
						return
					} else if (error.response.data.message === "Pip UUID doesn't exist") {
						toast.negative({
							title: "Unable to add Pip ID",
							description: "The Pip ID you entered does not exist"
						})
						return
					}
				}
			}
			if (_.isNull(addPipClass)) return
			const { pipName } = addPipClass.store.mirroredFormValues
			toast.negative({
				title: `Unable to add ${pipName} at this time`,
				description: "Please reload the page and try again"
			})
		}
	}, [addPipClass, autoCloseModalAfterAddPip, blueDotApiClient.pipDataService, pipClass, shouldAutoCloseModal, toast, validatePipData])
}
