"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function joinClass(classCode: ClassCode) : Promise<void> {
	try {
		// 7/10/25 TODO: Confirm user isn't already in this class
		if (authClass.isFinishedWithSignup === false) return

		const joinClassResponse = await blueDotApiClientClass.studentDataService.joinClass(classCode)
		if (!isEqual(joinClassResponse.status, 200) || isNonSuccessResponse(joinClassResponse.data)) {
			throw Error ("Unable to join class")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to join class",
			description: "Please reload the page and try again"
		})
	}
}
