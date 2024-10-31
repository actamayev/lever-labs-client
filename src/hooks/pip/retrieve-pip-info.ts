import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePipContext } from "../../contexts/pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePipInfoUseEffect(): void {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()

	const retrievePipInfo = useCallback(async () => {
		try {
			if (
				pipClass.isRetrievingPipData === true ||
				!_.isEmpty(pipClass.pipData) ||
				_.isNull(blueDotApiClient.httpClient.accessToken)
			) return

			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.retrievePreviouslyAddedPips()
			if (!_.isEqual(pipDataResponse.status, 200) || isErrorResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			pipClass.setPipData(pipDataResponse.data.userPipData)
		} catch (error) {
			console.error(error)
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [pipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService])

	useEffect(() => {
		void retrievePipInfo()
	}, [retrievePipInfo])
}
