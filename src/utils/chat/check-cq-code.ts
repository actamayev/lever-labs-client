"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function checkCareerQuestCode(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID,
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		careerQuestClass.addChallengeCheckCodeRequestMessage(careerUUIDChallengeUUID)
		careerQuestClass.resetChallengeStreamingState(careerUUIDChallengeUUID)
		careerQuestClass.changeMainSlideToCqChat(careerUUIDChallengeUUID.careerUUID, careerUUIDChallengeUUID.challengeUUID)

		const userCode = careerQuestClass.getCppCode(careerUUIDChallengeUUID)

		const response = await blueDotApiClientClass.chatDataService.checkChallengeCode({
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) return

		careerQuestClass.addChallengeEvaluationResultMessage(careerUUIDChallengeUUID, {
			isCorrect: response.data.isCorrect,
			feedback: response.data.feedback
		})
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
