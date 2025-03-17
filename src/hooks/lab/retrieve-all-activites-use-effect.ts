"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { useActivityProgressContext } from "../../contexts/activity-progress-context"

export default function useRetrieveAllActivitiesUseEffect(): void {
	const blueDotApiClient = useApiClientContext()
	const activityProgressClass = useActivityProgressContext()

	// 2/21/25 TODO: Fix this endpoint being hit twice in a row
	const retrieveAllActivities = useCallback(async () => {
		try {
			if (
				activityProgressClass.isRetrievingActivityProgress === true ||
				isNull(blueDotApiClient.httpClient.accessToken) ||
				activityProgressClass.didRetrieveAllActivityProgress === true
			) return

			activityProgressClass.setIsRetrievingAllActivityProgress(true)

			const userActivityProgressResponse = await blueDotApiClient.labActivityTrackingDataService.retrieveUserActivityProgress()
			if (!isEqual(userActivityProgressResponse.status, 200) || isErrorResponse(userActivityProgressResponse.data)) {
				throw Error ("Unable to retrieve lab activity tracking data")
			}
			activityProgressClass.updateActivitiesFromServer(userActivityProgressResponse.data.userActivityProgress)
		} catch (error) {
			console.error(error)
		} finally {
			activityProgressClass.setIsRetrievingAllActivityProgress(false)
		}
	}, [activityProgressClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.labActivityTrackingDataService])

	useEffect(() => {
		void retrieveAllActivities()
	}, [retrieveAllActivities])
}
