"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { Scoreboard } from "@bluedotrobots/common-ts/types/scoreboard"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import blueDotApiClient from "../../../classes/blue-dot-api-client-class"
import isNull from "lodash-es/isNull"

export default async function createScoreboard(classCode: ClassCode, scoreboardName: string): Promise<Scoreboard | null> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return null

		const createHubResponse = await blueDotApiClient.teacherDataService.createScoreboard(classCode, scoreboardName)

		if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
			throw Error("Unable to create scoreboard")
		}

		teacherClass.createScoreboard(createHubResponse.data)
		return createHubResponse.data
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to create scoreboard",
			description: "Please try again"
		})
		return null
	}
}
