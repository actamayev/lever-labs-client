"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import activityProgressClass from "../../classes/activity-progress-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveAllActivities(): Promise<void> {
	try {
		if (
			activityProgressClass.isRetrievingActivityProgress === true ||
			isNull(blueDotApiClientClass.httpClient.accessToken) ||
			activityProgressClass.didRetrieveAllActivityProgress === true
		) return

		activityProgressClass.setIsRetrievingAllActivityProgress(true)

		const userActivityProgressResponse = await blueDotApiClientClass.labActivityTrackingDataService.retrieveUserActivityProgress()
		if (!isEqual(userActivityProgressResponse.status, 200) || isErrorResponse(userActivityProgressResponse.data)) {
			throw Error ("Unable to retrieve lab activity tracking data")
		}
		activityProgressClass.updateActivitiesFromServer(userActivityProgressResponse.data.userActivityProgress)
		activityProgressClass.setIsRetrievingAllActivityProgress(false)
	} catch (error) {
		console.error(error)
		activityProgressClass.setIsRetrievingAllActivityProgress(false)
	}
}
