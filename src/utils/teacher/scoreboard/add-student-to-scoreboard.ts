"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, ScoreboardUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import leverLabsApiClient from "../../../classes/lever-labs-api-client-class"
import isNull from "lodash-es/isNull"

export default async function addStudentToScoreboard(
	classCode: ClassCode,
	studentId: number,
	scoreboardId: ScoreboardUUID,
	teamNumber: 1 | 2 = 1
): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const addResponse = await leverLabsApiClient.teacherDataService.addStudentToScoreboard(
			classCode, studentId, scoreboardId, teamNumber
		)

		if (!isEqual(addResponse.status, 200) || isNonSuccessResponse(addResponse.data)) {
			throw Error("Unable to add student to scoreboard")
		}

		teacherClass.addStudentToScoreboard(scoreboardId, studentId, teamNumber)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to add student to scoreboard",
			description: "Please try again"
		})
	}
}
