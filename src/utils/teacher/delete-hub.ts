"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, HubUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getTeacherClass from "../../classes/teacher-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteHub(classCode: ClassCode, hubId: HubUUID): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		const createHubResponse = await getBlueDotApiClientClass().teacherDataService.deleteHub(classCode, hubId)

		if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
			throw Error("Unable to delete hub")
		}

		getTeacherClass().deleteHub(classCode, hubId)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to delete hub",
			description: "Please try again"
		})
	}
}
