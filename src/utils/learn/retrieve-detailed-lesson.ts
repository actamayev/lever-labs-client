"use client"

import isEqual from "lodash-es/isEqual"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { isErrorResponses } from "../type-checks"
import learnClass from "../../classes/learn-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function retrieveDetailedLesson(lessonId: LessonUUID): Promise<void> {
	try {
		const lesson = learnClass.getLesson(lessonId)
		if (
			!lesson ||
			learnClass.isRetrievingDetailedData(lessonId) ||
			learnClass.hasRetrievedDetailedData(lessonId)
		) return

		learnClass.setIsRetrievingDetailedData(lessonId, true)

		const response = await leverLabsApiClient.learnDataService.getDetailedLesson(lessonId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to retrieve lesson details")
		}

		learnClass.setLessonQuestionMap(lessonId, response.data.lesson.lessonQuestionMap)
		learnClass.setHasRetrievedDetailedData(lessonId, true)
		learnClass.setIsRetrievingDetailedData(lessonId, false)
	} catch (error) {
		console.error(error)
		learnClass.setIsRetrievingDetailedData(lessonId, false)
	}
}


