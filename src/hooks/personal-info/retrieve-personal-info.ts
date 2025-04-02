"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useRetrievePersonalInfo(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()

	return useCallback(async () => {
		try {
			if (
				personalInfoClass.isRetrievingPersonalInfo === true ||
				isNull(blueDotApiClient.httpClient.accessToken) ||
				personalInfoClass.retrievedPeronsalInfo === true
			) return

			personalInfoClass.setIsRetrievingPersonalDetails(true)

			const personalInfoResponse = await blueDotApiClient.personalInfoDataService.retrievePersonalInfo()
			if (!isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
				throw Error ("Unable to retrieve personal info")
			}
			personalInfoClass.setRetrievedPersonalData(personalInfoResponse.data)
			personalInfoClass.setRetrievedPersonalInfo(true)
			personalInfoClass.setIsRetrievingPersonalDetails(false)
		} catch (error) {
			console.error(error)
			personalInfoClass.setIsRetrievingPersonalDetails(false)
		}
	}, [personalInfoClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService])
}
