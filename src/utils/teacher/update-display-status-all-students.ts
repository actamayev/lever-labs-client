"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function updateDisplayStatusForAllStudents(
	classCode: ClassCode,
	displayStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateDisplayStatusResponse = await blueDotApiClient.teacherDataService.updateDisplayStatusForAllStudents(
			classCode,
			displayStatus
		)

		if (!isEqual(updateDisplayStatusResponse.status, 200) || isNonSuccessResponse(updateDisplayStatusResponse.data)) {
			throw Error("Unable to update display status for all students")
		}

		teacherClass.updateDisplayStatusForAllStudents(classCode, displayStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update display status",
			description: "Please try again"
		})
	}
}
