import isEqual from "lodash-es/isEqual"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getStudentClass from "../../classes/student-class"

export default async function sendDinoScore(dinoScore: number): Promise<void> {
	try {
		const hubId = getStudentClass().getHubId()
		if (!hubId) return
		const sendDinoScoreResponse = await getBlueDotApiClientClass().studentDataService.sendDinoScore(dinoScore, hubId)
		if (!isEqual(sendDinoScoreResponse.status, 200) || isNonSuccessResponse(sendDinoScoreResponse.data)) {
			throw Error("Unable to send dino score")
		}

	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to send dino score",
			description: "Please try again"
		})
	}
}
