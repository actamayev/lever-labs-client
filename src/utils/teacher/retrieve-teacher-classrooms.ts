"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { isNonSuccessResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getTeacherClass from "../../classes/teacher-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveTeacherClassrooms(): Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			!isEmpty(getTeacherClass().classroomData) ||
			getTeacherClass().isRetrievingClassroomData === true ||
			getTeacherClass().retrievedClassroomData === true
		) return

		getTeacherClass().setIsRetrievingClassroomData(true)

		const teacherClassroomsResponse = await getBlueDotApiClientClass().teacherDataService.retrieveBasicClassroomInfo()
		if (!isEqual(teacherClassroomsResponse.status, 200) || isNonSuccessResponse(teacherClassroomsResponse.data)) {
			throw Error("Unable to retrieve teacher classroom data")
		}

		getTeacherClass().setRetrievedClassroomData(teacherClassroomsResponse.data)
	} catch (error) {
		console.error(error)
		getTeacherClass().setIsRetrievingClassroomData(false)
		return getToastClass().negative({
			title: "Unable to retrieve classroom data",
			description: "Please reload the page and try again"
		})
	}
}
