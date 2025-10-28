"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import learnClass from "../../classes/learn-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default async function submitActionToCodeMultipleChoiceAnswer(
	lessonUuid: LessonUUID,
	questionId: string,
	answerChoiceId: number,
): Promise<void> {
	try {
		const response = await leverLabsApiClient.learnDataService.submitActionToCodeMultipleChoiceAnswer(lessonUuid, answerChoiceId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit action-to-code-multiple-choice answer")
		}

		learnClass.setQuestionAnsweredCorrectness(lessonUuid, questionId, answerChoiceId)
	} catch (error) {
		console.error(error)
		learnClass.setQuestionAnsweredCorrectness(lessonUuid, questionId, answerChoiceId)
	}
}
