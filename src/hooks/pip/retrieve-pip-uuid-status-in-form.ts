import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePipUUIDStatusInForm(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()

	return useCallback(async () => {
		try {
			if (_.isNull(addPipClass)) return
			const { pipUUID } = addPipClass.store.mirroredFormValues
			if (!isPipUUIDValid(pipUUID)) {
				addPipClass.form.setValue("pipName", "")
				addPipClass.store.updateMirroredFormValues("pipName", "")
				return
			}

			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				addPipClass.store.updateAddingNewPipRequirements("userAlreadyAddedUUID", true)
				return
			}

			if (_.isNull(blueDotApiClient.httpClient.accessToken)) return

			const pipUUIDStatusData = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
			if (!_.isEqual(pipUUIDStatusData.status, 200) || isNonSuccessResponse(pipUUIDStatusData.data)) {
				throw Error ("Unable to retrieve pip UUID Status")
			}
			addPipClass.store.updateAddingNewPipRequirements("doesPipUUIDExist", true)
			addPipClass.store.updateAddingNewPipRequirements("hasPipNamePreviouslyBeenAdded", !_.isNull(pipUUIDStatusData.data.pipName))
			addPipClass.store.updateAddingNewPipRequirements("isPipOnline", pipUUIDStatusData.data.pipConnectionStatus !== "inactive")
			if (!_.isNull(pipUUIDStatusData.data.pipName)) {
				addPipClass.form.setValue("pipName", pipUUIDStatusData.data.pipName)
				addPipClass.store.updateMirroredFormValues("pipName", pipUUIDStatusData.data.pipName)
			}
		} catch (error) {
			console.error(error)
		}
	}, [addPipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
