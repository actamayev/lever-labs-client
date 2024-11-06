import _ from "lodash"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePersonalInfoUseEffect(): void {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	const retrievePersonalInfo = useCallback(async () => {
		try {
			if (
				personalInfoClass.isRetrievingPersonalInfo === true ||
				_.isNull(blueDotApiClient.httpClient.accessToken)
			) return

			personalInfoClass.setIsRetrievingPersonalDetails(true)

			const personalInfoResponse = await blueDotApiClient.personalInfoDataService.retrievePersonalInfo()
			if (!_.isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
				throw Error ("Unable to retrieve personal info")
			}
			personalInfoClass.setRetrievedPersonalData(personalInfoResponse.data)
		} catch (error) {
			console.error(error)
		} finally {
			personalInfoClass.setIsRetrievingPersonalDetails(false)
		}
	}, [personalInfoClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService])

	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
