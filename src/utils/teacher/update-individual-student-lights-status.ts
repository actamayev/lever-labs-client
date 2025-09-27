"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function updateIndividualStudentLightsStatus(
	classCode: ClassCode,
	studentId: number,
	garageLightsStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateLightsStatusResponse = await leverLabsApiClient.teacherDataService.updateIndividualStudentLightsStatus(
			classCode,
			studentId,
			garageLightsStatus
		)

		if (!isEqual(updateLightsStatusResponse.status, 200) || isNonSuccessResponse(updateLightsStatusResponse.data)) {
			throw Error("Unable to update individual student lights status")
		}

		teacherClass.updateIndividualStudentLightsStatus(classCode, studentId, garageLightsStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update student lights status",
			description: "Please try again"
		})
	}
}
