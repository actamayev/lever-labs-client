"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default async function submitFillInBlankAnswer(
	lessonUuid: LessonUUID,
	fillInTheBlankId: string,
	cppCode: string,
): Promise<{ isCorrect: boolean; feedback: string }> {
	try {
		const response = await leverLabsApiClient.learnDataService.submitFillInTheBlankAnswer(
			lessonUuid,
			fillInTheBlankId,
			cppCode
		)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit fill-in-blank answer")
		}

		// The API returns { isCorrect: boolean, feedback: string }
		// Return both values to the caller
		const { isCorrect, feedback } = (response.data as { isCorrect: boolean; feedback: string })
		return { isCorrect: isCorrect === true, feedback: feedback ?? "" }
	} catch (error) {
		console.error(error)
		return { isCorrect: false, feedback: "" }
	}
}

