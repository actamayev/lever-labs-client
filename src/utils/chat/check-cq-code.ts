"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function checkCareerQuestCode(
	careerIdChallengeId: CareerIdChallengeId,
	userCode: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		careerQuestClass.addChallengeCheckCodeRequestMessage(careerIdChallengeId)
		careerQuestClass.resetChallengeStreamingState(careerIdChallengeId)

		const response = await blueDotApiClientClass.chatDataService.checkCareerQuestCode({
			careerId: careerIdChallengeId.careerId,
			challengeId: careerIdChallengeId.challengeId,
			userCode,
		})

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) return

		careerQuestClass.addChallengeEvaluationResultMessage(careerIdChallengeId, {
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
