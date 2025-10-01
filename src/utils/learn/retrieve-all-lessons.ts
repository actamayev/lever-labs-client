"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import authClass from "../../classes/auth-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import learnClass from "../../classes/learn-class"

export default async function retrieveAllLessons(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			learnClass.isRetrievingAllLessons === true ||
			learnClass.hasRetrievedAllLessons === true
		) return

		learnClass.setIsRetrievingAllLessons(true)

		const lessonsResponse = await leverLabsApiClient.learnDataService.getLessons()
		if (!isEqual(lessonsResponse.status, 200) || isErrorResponses(lessonsResponse.data)) {
			throw Error ("Unable to retrieve lessons")
		}

		learnClass.setLessons(lessonsResponse.data.lessons)
		learnClass.setHasRetrievedAllLessons(true)
		learnClass.setIsRetrievingAllLessons(false)
	} catch (error) {
		console.error(error)
		learnClass.setIsRetrievingAllLessons(false)
	}
}
