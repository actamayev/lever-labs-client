"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function updateIndividualStudentDrivingStatus(
	classCode: ClassCode,
	studentId: number,
	garageDrivingStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateDrivingStatusResponse = await leverLabsApiClient.teacherDataService.updateIndividualStudentDrivingStatus(
			classCode,
			studentId,
			garageDrivingStatus
		)

		if (!isEqual(updateDrivingStatusResponse.status, 200) || isNonSuccessResponse(updateDrivingStatusResponse.data)) {
			throw Error("Unable to update individual student driving status")
		}

		teacherClass.updateIndividualStudentDrivingStatus(classCode, studentId, garageDrivingStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update student driving status",
			description: "Please try again"
		})
	}
}
