"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default async function updateSoundsStatusForAllStudents(
	classCode: ClassCode,
	garageSoundsStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateSoundsStatusResponse = await blueDotApiClient.teacherDataService.updateSoundsStatusForAllStudents(
			classCode,
			garageSoundsStatus
		)

		if (!isEqual(updateSoundsStatusResponse.status, 200) || isNonSuccessResponse(updateSoundsStatusResponse.data)) {
			throw Error("Unable to update sounds status for all students")
		}

		teacherClass.updateSoundsStatusForAllStudents(classCode, garageSoundsStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update sounds status",
			description: "Please try again"
		})
	}
}
