"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponses } from "../type-checks"
import authClass from "../../classes/auth-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import learnClass from "../../classes/learn-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default async function markLessonComplete(lessonUuid: LessonUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const response = await leverLabsApiClient.learnDataService.markLessonComplete(lessonUuid)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to mark lesson complete")
		}

		learnClass.setLessonCompleted(lessonUuid)
	} catch (error) {
		console.error(error)
	}
}
