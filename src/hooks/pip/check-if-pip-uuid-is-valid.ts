import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import isPipUUIDValid from "../../utils/is-pip-uuid-valid"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useCheckIfPipUUIDIsValid(): (
	pipUUID: PipUUID,
	setIsPipNameNeeded: React.Dispatch<React.SetStateAction<boolean>>,
	setDoesPipUUIDExist: React.Dispatch<React.SetStateAction<boolean>>,
	setUserAlreadyAddedUUID: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()

	// eslint-disable-next-line complexity
	return useCallback(async (
		pipUUID: PipUUID,
		setIsPipNameNeeded: React.Dispatch<React.SetStateAction<boolean>>,
		setDoesPipUUIDExist: React.Dispatch<React.SetStateAction<boolean>>,
		setUserAlreadyAddedUUID: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (
				_.isNull(blueDotApiClient.httpClient.accessToken) ||
				!isPipUUIDValid(pipUUID)
			) return

			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				setUserAlreadyAddedUUID(true)
				return
			}
			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.checkIfPipUUIDIsValid(pipUUID)
			if (!_.isEqual(pipDataResponse.status, 200) || isNonSuccessResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			setDoesPipUUIDExist(true)
			if (pipDataResponse.data.success === "Please add name.") {
				setIsPipNameNeeded(true)
			} else if (pipDataResponse.data.success === "Name already added") {
				setIsPipNameNeeded(false)
			}
		} catch (error) {
			console.error(error)
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [pipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService])
}
