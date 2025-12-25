"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function updateTonesStatusForAllStudents(
	classCode: ClassCode,
	garageTonesStatus: boolean
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const updateTonesStatusResponse = await leverLabsApiClient.teacherDataService.updateTonesStatusForAllStudents(
			classCode,
			garageTonesStatus
		)

		if (!isEqual(updateTonesStatusResponse.status, 200) || isNonSuccessResponse(updateTonesStatusResponse.data)) {
			throw Error("Unable to update tones status for all students")
		}

		teacherClass.updateTonesStatusForAllStudents(classCode, garageTonesStatus)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to update tones status",
			description: "Please try again"
		})
	}
}
