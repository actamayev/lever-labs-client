"use client"

import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getChatManagerClass from "../../classes/chat-manager-class"

export default async function checkCareerQuestCode(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID,
): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		getChatManagerClass().addChallengeCheckCodeRequestMessage(careerUUIDChallengeUUID)
		getChatManagerClass().resetChallengeStreamingState(careerUUIDChallengeUUID)
		getCareerQuestClass().changeMainSlideToCqChat(careerUUIDChallengeUUID.careerUUID, careerUUIDChallengeUUID.challengeUUID)

		const userCode = getChatManagerClass().getCppCode(careerUUIDChallengeUUID)
		getChatManagerClass().setChallengeWaitingForCodeCheck(careerUUIDChallengeUUID, true)

		const response = await getBlueDotApiClientClass().chatDataService.checkChallengeCode({
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) return

		getChatManagerClass().addChallengeEvaluationResultMessage(careerUUIDChallengeUUID, {
			isCorrect: response.data.isCorrect,
			feedback: response.data.feedback
		})
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
		getChatManagerClass().setChallengeWaitingForCodeCheck(careerUUIDChallengeUUID, false)
	}
}
