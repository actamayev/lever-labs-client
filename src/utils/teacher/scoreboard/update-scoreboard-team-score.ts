"use client"

import isEqual from "lodash-es/isEqual"
import { ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import blueDotApiClient from "../../../classes/lever-labs-api-client-class"
import isNull from "lodash-es/isNull"

export default async function updateScoreboardTeamScore(scoreboardId: ScoreboardUUID, teamNumber: 1 | 2, newScore: number): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const classCode = teacherClass.getScoreboardData(scoreboardId)?.classCode
		if (!classCode) return

		const updateResponse = await blueDotApiClient.teacherDataService.updateScoreboardTeamScore(
			scoreboardId,
			teamNumber,
			newScore,
			classCode
		)

		if (!isEqual(updateResponse.status, 200) || isNonSuccessResponse(updateResponse.data)) {
			throw Error("Unable to update team score")
		}

		teacherClass.updateScoreboardTeamScore(scoreboardId, teamNumber, newScore)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update team score",
			description: "Please try again"
		})
	}
}
