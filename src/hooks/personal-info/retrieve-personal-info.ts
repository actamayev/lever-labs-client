"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../classes/personal-info-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useRetrievePersonalInfo(): () => Promise<void> {
	const personalInfoClass = usePersonalInfoContext()

	return useCallback(async () => {
		try {
			if (
				personalInfoClass.isRetrievingPersonalInfo === true ||
				isNull(blueDotApiClientClass.httpClient.accessToken) ||
				personalInfoClass.retrievedPersonalInfo === true
			) return

			personalInfoClass.setIsRetrievingPersonalDetails(true)

			const personalInfoResponse = await blueDotApiClientClass.personalInfoDataService.retrievePersonalInfo()
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
	}, [personalInfoClass, blueDotApiClientClass.httpClient.accessToken, blueDotApiClientClass.personalInfoDataService])
}
