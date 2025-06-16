"use client"

import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import pipClass from "../../classes/pip-class"
import useToastOptions from "../../components/toast-options"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useRetrievePipInfo(): () => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (
				pipClass.isRetrievingPipData === true ||
				!isEmpty(pipClass.pipData) ||
				isNull(blueDotApiClientClass.httpClient.accessToken) ||
				pipClass.retrievedPipData === true
			) return

			pipClass.setIsRetrievingPipData(true)

			const pipDataResponse = await blueDotApiClientClass.pipDataService.retrievePreviouslyAddedPips()
			if (!isEqual(pipDataResponse.status, 200) || isErrorResponse(pipDataResponse.data)) {
				throw Error ("Unable to retrieve pip Data")
			}
			pipClass.setPipData(pipDataResponse.data.userPipData)
			pipClass.setRetrievedPipData(true)
			pipClass.setIsRetrievingPipData(false)
		} catch (error) {
			console.error(error)
			pipClass.setIsRetrievingPipData(false)
			return toast.negative({
				title: "Unable to retrieve Pip Info",
				description: "Please reload the page and try again"
			})
		}
	}, [toast])
}
