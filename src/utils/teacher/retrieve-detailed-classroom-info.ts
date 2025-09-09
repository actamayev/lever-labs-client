"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { isNonSuccessResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getTeacherClass from "../../classes/teacher-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveDetailedClassroomInfo(classCode: ClassCode): Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			getTeacherClass().getDetailedClassroomData(classCode) !== undefined ||
			getTeacherClass().isRetrievingDetailedData === true
		) return

		getTeacherClass().setIsRetrievingDetailedData(true)

		const detailedClassroomResponse = await getBlueDotApiClientClass().teacherDataService.retrieveDetailedClassroomInfo(classCode)
		if (!isEqual(detailedClassroomResponse.status, 200) || isNonSuccessResponse(detailedClassroomResponse.data)) {
			throw Error("Unable to retrieve detailed classroom data")
		}
		getTeacherClass().setDetailedClassroomData(classCode, detailedClassroomResponse.data)
	} catch (error) {
		console.error(error)
		getTeacherClass().setIsRetrievingDetailedData(false)
		return getToastClass().negative({
			title: "Unable to retrieve classroom details",
			description: "Please reload the page and try again"
		})
	}
}
