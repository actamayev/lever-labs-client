import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePipInfoUseEffect(): void {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()

	const retrievePipInfo = useCallback(async () => {
		try {
			if (
				pipClass.isRetrievingPipData === true ||
				!isEmpty(pipClass.pipData) ||
				isNull(blueDotApiClient.httpClient.accessToken) ||
				pipClass.retrievedPipData === true
			) return

			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClient.pipDataService.retrievePreviouslyAddedPips()
			if (!isEqual(pipDataResponse.status, 200) || isErrorResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			pipClass.setPipData(pipDataResponse.data.userPipData)
			pipClass.setRetrievedPipData(true)
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to retrieve Pip Info",
				description: "Please reload the page and try again"
			})
		} finally {
			pipClass.setIsRetrievingPipData(false)
		}
	}, [pipClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.pipDataService, toast])

	useEffect(() => {
		void retrievePipInfo()
	}, [retrievePipInfo])
}
