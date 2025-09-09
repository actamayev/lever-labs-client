"use client"

import isEqual from "lodash-es/isEqual"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { CareerUUID, ClassCode } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getTeacherClass from "../../classes/teacher-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function createHub(
	classCode: ClassCode,
	hubName: string,
	careerUUID: CareerUUID,
	slideId: string
): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		const createHubResponse = await getBlueDotApiClientClass().teacherDataService.createHub(classCode, hubName, careerUUID, slideId)

		if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
			throw Error("Unable to create hub")
		}

		// Add the new classroom to local state
		const newClassroom: TeacherViewHubData = {
			hubName, classCode, careerUUID, slideId,
			hubId: createHubResponse.data.hubId, studentsJoined: [] }
		getTeacherClass().createHub(newClassroom)
		// getTeacherClass().setIsFocusingStudents(true)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to create hub",
			description: "Please try again"
		})
	}
}
