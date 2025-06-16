"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrievePersonalInfo(): Promise<void> {
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
		return toastClass.negative({
			title: "Unable to retrieve Personal Info",
			description: "Please reload the page and try again"
		})
	}
}
