"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { QuestionUUID } from "@lever-labs/common-ts/types/utils"

export default async function submitActionToCodeMultipleChoiceAnswer(
	questionId: QuestionUUID,
	answerChoiceId: number,
): Promise<SubmitMCQResponse> {
	try {
		const response = await leverLabsApiClient.questDataService.submitActionToCodeMultipleChoiceAnswer(questionId, answerChoiceId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit action-to-code-multiple-choice answer")
		}

		const isCorrect = response.data.correctAnswerId === answerChoiceId
		return {
			isCorrect,
			correctAnswerChoiceId: response.data.correctAnswerId ?? undefined
		}
	} catch (error) {
		console.error(error)
		return { isCorrect: false }
	}
}
