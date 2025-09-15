"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function updateLightsStatusForAllStudents(
	classCode: ClassCode,
	garageLightsStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateLightsStatusResponse = await blueDotApiClient.teacherDataService.updateLightsStatusForAllStudents(
			classCode,
			garageLightsStatus
		)

		if (!isEqual(updateLightsStatusResponse.status, 200) || isNonSuccessResponse(updateLightsStatusResponse.data)) {
			throw Error("Unable to update lights status for all students")
		}

		teacherClass.updateLightsStatusForAllStudents(classCode, garageLightsStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update lights status",
			description: "Please try again"
		})
	}
}
