"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, HubUUID } from "@lever-labs/common-ts/types/utils"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import studentClass from "../../classes/student-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default async function leaveHub(classCode: ClassCode, hubId: HubUUID): Promise<void> {
	try {
		const isStudentInHub = studentClass.checkIfStudentInHub(classCode, hubId)
		if (!isStudentInHub) {
			toastClass.positive({
				title: "You're not in this hub"
			})
			return
		}
		const leaveHubResponse = await blueDotApiClient.studentDataService.leaveHub(classCode, hubId)
		if (!isEqual(leaveHubResponse.status, 200) || isNonSuccessResponse(leaveHubResponse.data)) {
			throw Error("Unable to leave hub")
		}

		studentClass.leaveHub(classCode, hubId)
		// TODO: Take the user to the /career quest page with the isHubJoined flag set to true
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to leave hub",
			description: "Please try again"
		})
	}
}
