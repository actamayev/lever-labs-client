import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useCheckIfPipUUIDIsValid(): (pipUUID: PipUUID) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()

	return useCallback(async (pipUUID: PipUUID) => {
		try {
			if (
				_.isNull(blueDotApiClient.httpClient.accessToken) ||
				!isPipUUIDValid(pipUUID)
			) return

			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				pipClass.updateAddingNewPipRequirements("userAlreadyAddedUUID", true)
				return
			}
			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.checkIfPipUUIDIsValid(pipUUID)
			if (!_.isEqual(pipDataResponse.status, 200) || isNonSuccessResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			pipClass.updateAddingNewPipRequirements("doesPipUUIDExist", true)
			pipClass.updateAddingNewPipRequirements("isPipNameNeeded", pipDataResponse.data.needsToAddName)
		} catch (error) {
			console.error(error)
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, pipClass])
}
