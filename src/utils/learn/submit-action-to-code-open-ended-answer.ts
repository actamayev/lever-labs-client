"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default async function submitActionToCodeOpenEndedAnswer(
	lessonUuid: LessonUUID,
	actionToCodeOpenEndedId: string,
	userCode: string,
): Promise<{ isCorrect: boolean; feedback: string }> {
	try {
		const response = await leverLabsApiClient.learnDataService.submitActionToCodeOpenEndedAnswer(
			lessonUuid,
			actionToCodeOpenEndedId,
			userCode
		)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit action-to-code-open-ended answer")
		}

		return {
			isCorrect: response.data.isCorrect,
			feedback: response.data.feedback || ""
		}
	} catch (error) {
		console.error(error)
		return {
			isCorrect: false,
			feedback: "An error occurred while checking your answer. Please try again."
		}
	}
}
