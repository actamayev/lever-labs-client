"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { QuestionUUID } from "@actamayev/lever-labs-common-ts/types/utils"

export default async function submitBlockToFunctionAnswer(
	questionId: QuestionUUID,
	answerChoiceId: number,
): Promise<SubmitMCQResponse> {
	try {
		const response = await leverLabsApiClient.questDataService.submitBlockToFunctionAnswer(questionId, answerChoiceId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit block-to-function answer")
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
