"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, ScoreboardUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import leverLabsApiClient from "../../../classes/lever-labs-api-client-class"
import isNull from "lodash-es/isNull"

export default async function deleteScoreboard(classCode: ClassCode, scoreboardId: ScoreboardUUID): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const deleteResponse = await leverLabsApiClient.teacherDataService.deleteScoreboard(classCode, scoreboardId)

		if (!isEqual(deleteResponse.status, 200) || isNonSuccessResponse(deleteResponse.data)) {
			throw Error("Unable to delete scoreboard")
		}

		teacherClass.deleteScoreboard(scoreboardId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete scoreboard",
			description: "Please try again"
		})
	}
}
