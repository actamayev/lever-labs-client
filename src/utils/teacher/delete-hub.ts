"use client"

import { UUID } from "crypto"
import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteHub(classCode: ClassCode, hubId: UUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const createHubResponse = await blueDotApiClientClass.teacherDataService.deleteHub(classCode, hubId)

		if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
			throw Error("Unable to delete hub")
		}

		teacherClass.deleteHub(classCode, hubId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete hub",
			description: "Please try again"
		})
	}
}
