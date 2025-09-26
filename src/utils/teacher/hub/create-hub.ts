"use client"

import isEqual from "lodash-es/isEqual"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { CareerUUID, ClassCode } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import blueDotApiClient from "../../../classes/blue-dot-api-client-class"
import isNull from "lodash-es/isNull"

export default async function createHub(
	classCode: ClassCode,
	hubName: string,
	careerUUID: CareerUUID,
	slideId: string
): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(teacherClass.teacherData) ||
			!teacherClass.teacherData.isApproved
		) return

		const createHubResponse = await blueDotApiClient.teacherDataService.createHub(classCode, hubName, careerUUID, slideId)

		if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
			throw Error("Unable to create hub")
		}

		// Add the new classroom to local state
		const newClassroom: TeacherViewHubData = {
			hubName, classCode, careerUUID, slideId,
			hubId: createHubResponse.data.hubId, studentsJoined: [] }
		teacherClass.createHub(newClassroom)
		// teacherClass.setIsFocusingStudents(true)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to create hub",
			description: "Please try again"
		})
	}
}
