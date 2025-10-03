"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default async function submitFillInBlankAnswer(
	lessonUuid: LessonUUID,
	fillInTheBlankId: string,
	cppCode: string,
): Promise<boolean> {
	try {
		const response = await leverLabsApiClient.learnDataService.submitFillInTheBlankAnswer(
			lessonUuid,
			fillInTheBlankId,
			cppCode
		)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to submit fill-in-blank answer")
		}

		// Return true if the answer was correct (API should return success response with correctness info)
		// For now, we'll assume true if the request succeeds
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

