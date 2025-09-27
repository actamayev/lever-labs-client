"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import blueDotApiClient from "../../../classes/blue-dot-api-client-class"
import isNull from "lodash-es/isNull"

export default async function removeStudentFromScoreboard(
	classCode: ClassCode,
	studentId: number,
	scoreboardId: ScoreboardUUID,
	teamNumber: 1 | 2
): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const removeResponse = await blueDotApiClient.teacherDataService.removeStudentFromScoreboard(
			classCode,
			studentId,
			scoreboardId,
			teamNumber
		)

		if (!isEqual(removeResponse.status, 200) || isNonSuccessResponse(removeResponse.data)) {
			throw Error("Unable to remove student from scoreboard")
		}

		teacherClass.removeStudentFromScoreboard(scoreboardId, studentId, teamNumber)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to remove student from scoreboard",
			description: "Please try again"
		})
	}
}
