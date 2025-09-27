"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default async function updateIndividualStudentDisplayStatus(
	classCode: ClassCode,
	studentId: number,
	garageDisplayStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateDisplayStatusResponse = await blueDotApiClient.teacherDataService.updateIndividualStudentDisplayStatus(
			classCode,
			studentId,
			garageDisplayStatus
		)

		if (!isEqual(updateDisplayStatusResponse.status, 200) || isNonSuccessResponse(updateDisplayStatusResponse.data)) {
			throw Error("Unable to update individual student display status")
		}

		teacherClass.updateIndividualStudentDisplayStatus(classCode, studentId, garageDisplayStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update student display status",
			description: "Please try again"
		})
	}
}
