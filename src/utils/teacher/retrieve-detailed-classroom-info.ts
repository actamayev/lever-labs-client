"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { isNonSuccessResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveDetailedClassroomInfo(classCode: ClassCode): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			teacherClass.getDetailedClassroomData(classCode) !== undefined ||
			teacherClass.isRetrievingDetailedData === true
		) return

		teacherClass.setIsRetrievingDetailedData(true)

		const detailedClassroomResponse = await blueDotApiClientClass.teacherDataService.retrieveDetailedClassroomInfo(classCode)
		if (!isEqual(detailedClassroomResponse.status, 200) || isNonSuccessResponse(detailedClassroomResponse.data)) {
			throw Error("Unable to retrieve detailed classroom data")
		}
		teacherClass.setDetailedClassroomData(classCode, detailedClassroomResponse.data)
	} catch (error) {
		console.error(error)
		teacherClass.setIsRetrievingDetailedData(false)
		return toastClass.negative({
			title: "Unable to retrieve classroom details",
			description: "Please reload the page and try again"
		})
	}
}
