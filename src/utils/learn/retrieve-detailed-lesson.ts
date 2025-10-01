"use client"

import isEqual from "lodash-es/isEqual"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { isErrorResponses } from "../type-checks"
import learnClass from "../../classes/learn-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function retrieveDetailedLesson(lessonUuid: LessonUUID): Promise<void> {
	try {
		const lesson = learnClass.getLesson(lessonUuid)
		if (
			!lesson ||
			learnClass.isRetrievingDetailedData(lessonUuid) ||
			learnClass.hasRetrievedDetailedData(lessonUuid)
		) return

		learnClass.setIsRetrievingDetailedData(lessonUuid, true)

		const response = await leverLabsApiClient.learnDataService.getDetailedLesson(lessonUuid)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to retrieve lesson details")
		}

		learnClass.setLessonQuestionMap(lessonUuid, response.data.lesson.lessonQuestionMap)
		learnClass.setHasRetrievedDetailedData(lessonUuid, true)
		learnClass.setIsRetrievingDetailedData(lessonUuid, false)
	} catch (error) {
		console.error(error)
		learnClass.setIsRetrievingDetailedData(lessonUuid, false)
	}
}


