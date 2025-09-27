"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function updateDrivingStatusForAllStudents(
	classCode: ClassCode,
	drivingStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateDrivingStatusResponse = await blueDotApiClient.teacherDataService.updateDrivingStatusForAllStudents(
			classCode,
			drivingStatus
		)

		if (!isEqual(updateDrivingStatusResponse.status, 200) || isNonSuccessResponse(updateDrivingStatusResponse.data)) {
			throw Error("Unable to update driving status for all students")
		}

		teacherClass.updateDrivingStatusForAllStudents(classCode, drivingStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update driving status",
			description: "Please try again"
		})
	}
}
