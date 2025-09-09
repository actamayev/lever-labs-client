"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import { isErrorResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function retrievePipInfo(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			!isEmpty(pipClass.pipData) ||
			pipClass.isRetrievingPipData === true ||
			pipClass.retrievedPipData === true
		) return

		pipClass.setIsRetrievingPipData(true)

		const pipDataResponse = await blueDotApiClient.pipDataService.retrievePreviouslyAddedPips()
		if (!isEqual(pipDataResponse.status, 200) || isErrorResponse(pipDataResponse.data)) {
			throw Error ("Unable to retrieve pip Data")
		}
		pipClass.setPipData(pipDataResponse.data.userPipData)
	} catch (error) {
		console.error(error)
		pipClass.setIsRetrievingPipData(false)
		return toastClass.negative({
			title: "Unable to retrieve Pip Info",
			description: "Please reload the page and try again"
		})
	}
}
