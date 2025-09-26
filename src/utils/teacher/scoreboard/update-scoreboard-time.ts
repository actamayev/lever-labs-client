"use client"

import isEqual from "lodash-es/isEqual"
import { ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import blueDotApiClient from "../../../classes/blue-dot-api-client-class"
import isNull from "lodash-es/isNull"

export default async function updateScoreboardTime(scoreboardId: ScoreboardUUID, timeInSeconds: number): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const updateResponse = await blueDotApiClient.teacherDataService.updateScoreboardTime(scoreboardId, timeInSeconds)

		if (!isEqual(updateResponse.status, 200) || isNonSuccessResponse(updateResponse.data)) {
			throw Error("Unable to update scoreboard time")
		}

		teacherClass.updateScoreboardTime(scoreboardId, timeInSeconds)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update scoreboard time",
			description: "Please try again"
		})
	}
}
