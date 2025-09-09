"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import getPipClass from "../../classes/pip-class"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponse } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrievePipInfo(): Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			!isEmpty(getPipClass().pipData) ||
			getPipClass().isRetrievingPipData === true ||
			getPipClass().retrievedPipData === true
		) return

		getPipClass().setIsRetrievingPipData(true)

		const pipDataResponse = await getBlueDotApiClientClass().pipDataService.retrievePreviouslyAddedPips()
		if (!isEqual(pipDataResponse.status, 200) || isErrorResponse(pipDataResponse.data)) {
			throw Error ("Unable to retrieve pip Data")
		}
		getPipClass().setPipData(pipDataResponse.data.userPipData)
	} catch (error) {
		console.error(error)
		getPipClass().setIsRetrievingPipData(false)
		return getToastClass().negative({
			title: "Unable to retrieve Pip Info",
			description: "Please reload the page and try again"
		})
	}
}
