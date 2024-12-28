import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import useValidatePipData from "./validate-pip-data"
import { usePipContext } from "../../contexts/pip-context"
import useStyledToast from "../../components/toast-options"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useStyledToast()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const validatePipData = useValidatePipData()

	// eslint-disable-next-line complexity
	return useCallback(async () => {
		try {
			if (_.isNull(addPipClass)) return
			if (pipClass.checkIfUUIDAlreadyExists(addPipClass.form.getValues().pipUUID) === true) {
				throw new Error("You've already added a Pip with this ID")
			}

			if (validatePipData() === false) return

			if (_.isEmpty(addPipClass.form.getValues().pipName)) addPipClass.form.setValue("pipName", undefined)
			addPipClass.form.setValue("wifiNetworkName", undefined)
			addPipClass.form.setValue("wifiPassword", undefined)
			if (!addPipClass.store.addingNewPipRequirements.isPipOnline) {
				addPipClass.form.setValue("shouldAutoConnect", false)
			}

			const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(addPipClass.form.getValues())

			if (!_.isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			addPipClass.store.updateIsAppPipModalOpen(false)
			const pipDataToAdd: PipData = {
				pipName: addPipClass.form.getValues().pipName || addPipDataResponse.data.pipName,
				pipUUID: addPipClass.form.getValues().pipUUID,
				userPipUUIDId: addPipDataResponse.data.userPipUUIDId,
				pipConnectionStatus: addPipDataResponse.data.pipConnectionStatus
			}
			pipClass.addNewPip(pipDataToAdd)
			addPipClass.store.resetAddingPipRequirements()
			addPipClass.form.reset()
			toast.positive({
				description: `${addPipClass.form.getValues().pipName || addPipDataResponse.data.pipName} added`
			})
		} catch (error) {
			console.error(error)
			if (error instanceof Error && error.message === "You've already added a Pip with this ID") {
				toast.negative({
					title: "Unable to add Pip ID",
					description: "You've already added a Pip with this ID"
				})
				return
			} else if (error instanceof AxiosError) {
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
			toast.negative({
				title: `Unable to add ${addPipClass.form.getValues().pipName} at this time`,
				description: "Please reload page and try again"
			})
		}
	}, [addPipClass, blueDotApiClient.pipDataService, pipClass, toast, validatePipData])
}
