import { UUID } from "crypto"
import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import studentClass from "../../classes/student-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function leaveHub(classCode: ClassCode, hubId: UUID): Promise<void> {
	try {
		const isStudentInHub = studentClass.checkIfStudentInHub(classCode, hubId)
		if (!isStudentInHub) {
			toastClass.positive({
				title: "You're not in this hub"
			})
			return
		}
		const leaveHubResponse = await blueDotApiClientClass.studentDataService.leaveHub(classCode, hubId)
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
