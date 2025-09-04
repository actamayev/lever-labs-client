import { UUID } from "crypto"
import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import studentClass from "../../classes/student-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function joinHub(classCode: ClassCode, hubId: UUID): Promise<void> {
	try {
		const isStudentInHub = studentClass.checkIfStudentInHub(classCode, hubId)
		if (isStudentInHub) {
			toastClass.positive({
				title: "You're already in this hub"
			})
			return
		}
		const joinHubResponse = await blueDotApiClientClass.studentDataService.joinHub(classCode, hubId)
		if (!isEqual(joinHubResponse.status, 200) || isNonSuccessResponse(joinHubResponse.data)) {
			throw Error("Unable to join hub")
		}

		studentClass.joinHub(joinHubResponse.data)
		// TODO: Take the user to the /career quest page with the isHubJoined flag set to true
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to join hub",
			description: "Please try again"
		})
	}
}
