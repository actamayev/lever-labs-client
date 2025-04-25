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
			activityProgressClass.setIsRetrievingAllActivityProgress(false)
		} catch (error) {
			console.error(error)
			activityProgressClass.setIsRetrievingAllActivityProgress(false)
		}
	}, [activityProgressClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.labActivityTrackingDataService])

	useEffect(() => {
		void retrieveAllActivities()
	}, [retrieveAllActivities])
}
