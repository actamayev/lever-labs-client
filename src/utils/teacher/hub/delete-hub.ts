"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, HubUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../../classes/auth-class"
import toastClass from "../../../classes/toast-class"
import { isNonSuccessResponse } from "../../type-checks"
import teacherClass from "../../../classes/teacher-class"
import leverLabsApiClient from "../../../classes/lever-labs-api-client-class"

export default async function deleteHub(classCode: ClassCode, hubId: HubUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const createHubResponse = await leverLabsApiClient.teacherDataService.deleteHub(classCode, hubId)

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
