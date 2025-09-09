import isEqual from "lodash-es/isEqual"
import { ClassCode, HubUUID } from "@bluedotrobots/common-ts/types/utils"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getStudentClass from "../../classes/student-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function leaveHub(classCode: ClassCode, hubId: HubUUID): Promise<void> {
	try {
		const isStudentInHub = getStudentClass().checkIfStudentInHub(classCode, hubId)
		if (!isStudentInHub) {
			getToastClass().positive({
				title: "You're not in this hub"
			})
			return
		}
		const leaveHubResponse = await getBlueDotApiClientClass().studentDataService.leaveHub(classCode, hubId)
		if (!isEqual(leaveHubResponse.status, 200) || isNonSuccessResponse(leaveHubResponse.data)) {
			throw Error("Unable to leave hub")
		}

		getStudentClass().leaveHub(classCode, hubId)
		// TODO: Take the user to the /career quest page with the isHubJoined flag set to true
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to leave hub",
			description: "Please try again"
		})
	}
}
