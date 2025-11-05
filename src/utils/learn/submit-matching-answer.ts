"use client"

import isEqual from "lodash-es/isEqual"
import { QuestionUUID } from "@lever-labs/common-ts/types/utils"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function submitMatchingAnswer(
	questionId: QuestionUUID,
	codingBlockId: number,
	matchingAnswerChoiceTextId: number
): Promise<boolean> {
	try {
		const response = await leverLabsApiClient.learnDataService.submitMatchingAnswer(
			questionId,
			codingBlockId,
			matchingAnswerChoiceTextId
		)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit matching answer")
		}

		return response.data.isCorrect
	} catch (error) {
		console.error(error)
		return false
	}
}
