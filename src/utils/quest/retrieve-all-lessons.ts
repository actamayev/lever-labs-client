"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import authClass from "../../classes/auth-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import questClass from "../../classes/quest-class"

export default async function retrieveAllLessons(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			questClass.isRetrievingAllLessons === true ||
			questClass.hasRetrievedAllLessons === true
		) return

		questClass.setIsRetrievingAllLessons(true)

		const lessonsResponse = await leverLabsApiClient.questDataService.getLessons()
		if (!isEqual(lessonsResponse.status, 200) || isErrorResponses(lessonsResponse.data)) {
			throw Error ("Unable to retrieve lessons")
		}

		questClass.setLessons(lessonsResponse.data.lessons)
		questClass.setHasRetrievedAllLessons(true)
		questClass.setIsRetrievingAllLessons(false)
	} catch (error) {
		console.error(error)
		questClass.setIsRetrievingAllLessons(false)
	}
}
