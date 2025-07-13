"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { isNonSuccessResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveTeacherClassrooms(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			!isEmpty(teacherClass.classroomData) ||
			teacherClass.isRetrievingClassroomData === true ||
			teacherClass.retrievedClassroomData === true
		) return

		teacherClass.setIsRetrievingClassroomData(true)

		const teacherClassroomsResponse = await blueDotApiClientClass.teacherDataService.retrieveBasicClassroomInfo()
		if (!isEqual(teacherClassroomsResponse.status, 200) || isNonSuccessResponse(teacherClassroomsResponse.data)) {
			throw Error("Unable to retrieve teacher classroom data")
		}

		teacherClass.setRetrievedClassroomData(teacherClassroomsResponse.data)
	} catch (error) {
		console.error(error)
		teacherClass.setIsRetrievingClassroomData(false)
		return toastClass.negative({
			title: "Unable to retrieve classroom data",
			description: "Please reload the page and try again"
		})
	}
}
