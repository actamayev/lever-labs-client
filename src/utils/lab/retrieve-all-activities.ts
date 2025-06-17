"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import activityProgressClass from "../../classes/activity-progress-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveAllActivities(): Promise<void> {
	try {
		if (
			activityProgressClass.isRetrievingActivityProgress === true ||
			authClass.isFinishedWithSignup === false ||
			activityProgressClass.didRetrieveAllActivityProgress === true
		) return

		activityProgressClass.setIsRetrievingAllActivityProgress(true)

		const userActivityProgressResponse = await blueDotApiClientClass.labActivityTrackingDataService.retrieveUserActivityProgress()
		if (!isEqual(userActivityProgressResponse.status, 200) || isErrorResponse(userActivityProgressResponse.data)) {
			throw Error ("Unable to retrieve lab activity tracking data")
		}
		activityProgressClass.updateActivitiesFromServer(userActivityProgressResponse.data.userActivityProgress)
	} catch (error) {
		console.error(error)
		activityProgressClass.setIsRetrievingAllActivityProgress(false)
	}
}
