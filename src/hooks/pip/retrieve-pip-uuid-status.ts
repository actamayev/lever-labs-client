import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePipUUIDStatus(): (pipUUID: PipUUID) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()

	return useCallback(async (pipUUID: PipUUID) => {
		try {
			if (_.isNull(addPipClass)) return
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

			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
			if (!_.isEqual(pipDataResponse.status, 200) || isNonSuccessResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			addPipClass.store.updateAddingNewPipRequirements("doesPipUUIDExist", true)
			addPipClass.store.updateAddingNewPipRequirements("hasPipNamePreviouslyBeenAdded", !_.isNull(pipDataResponse.data.pipName))
			addPipClass.store.updateAddingNewPipRequirements("isPipOnline", pipDataResponse.data.pipConnectionStatus !== "inactive")
			if (!_.isNull(pipDataResponse.data.pipName)) {
				addPipClass.form.setValue("pipName", pipDataResponse.data.pipName)
				addPipClass.store.updateMirroredFormValues("pipName", pipDataResponse.data.pipName)
			}
		} catch (error) {
			console.error(error)
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [addPipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
