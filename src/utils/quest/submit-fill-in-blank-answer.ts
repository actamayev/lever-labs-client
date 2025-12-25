"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { QuestionUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import { soundManager } from "../../classes/utility/sound-manager-class"

export default async function submitFillInBlankAnswer(
	questionId: QuestionUUID,
	cppCode: string,
): Promise<{ isCorrect: boolean; feedback: string }> {
	try {
		const response = await leverLabsApiClient.questDataService.submitFillInTheBlankAnswer(
			questionId,
			cppCode
		)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit fill-in-blank answer")
		}

		// The API returns { isCorrect: boolean, feedback: string }
		// Return both values to the caller
		const { isCorrect, feedback } = (response.data as { isCorrect: boolean; feedback: string })
		if (isCorrect === true) {
			soundManager.playCorrect()
		} else {
			soundManager.playWrong()
		}
		return { isCorrect: isCorrect === true, feedback: feedback ?? "" }
	} catch (error) {
		console.error(error)
		soundManager.playWrong()
		return { isCorrect: false, feedback: "" }
	}
}

