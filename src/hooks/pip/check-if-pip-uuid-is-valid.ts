import _ from "lodash"
import { useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useCheckIfPipUUIDIsValid(): (
	pipUUID: PipUUID,
	form: UseFormReturn<IncompletePipData>
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()

	return useCallback(async (
		pipUUID: PipUUID,
		form: UseFormReturn<IncompletePipData>
	) => {
		try {
			if (!isPipUUIDValid(pipUUID)) {
				form.setValue("pipName", "")
				return
			}

			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				pipClass.updateAddingNewPipRequirements("userAlreadyAddedUUID", true)
				return
			}

			if (_.isNull(blueDotApiClient.httpClient.accessToken)) return

			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.checkIfPipUUIDIsValid(pipUUID)
			if (!_.isEqual(pipDataResponse.status, 200) || isNonSuccessResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			pipClass.updateAddingNewPipRequirements("doesPipUUIDExist", true)
			pipClass.updateAddingNewPipRequirements("hasPipNamePreviouslyBeenAdded", !_.isNull(pipDataResponse.data.pipName))
			pipClass.updateAddingNewPipRequirements("isPipOnline", pipDataResponse.data.pipConnectionStatus !== "inactive")
			if (!_.isNull(pipDataResponse.data.pipName)) {
				form.setValue("pipName", pipDataResponse.data.pipName)
			}
		} catch (error) {
			console.error(error)
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
