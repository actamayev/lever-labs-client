"use client"

import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getChatManagerClass from "../../classes/chat-manager-class"

export default async function requestCareerQuestHint(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID
): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		const userCode = getChatManagerClass().getCppCode(careerUUIDChallengeUUID)
		getChatManagerClass().addChallengeHintRequestMessage(careerUUIDChallengeUUID)
		getChatManagerClass().resetChallengeStreamingState(careerUUIDChallengeUUID)

		const response = await getBlueDotApiClientClass().chatDataService.requestChallengeHint({
			careerUUID: careerUUIDChallengeUUID.careerUUID,
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to request hint")
		}

		if ("streamId" in response.data) {
			getChatManagerClass().setChallengeStreamId(careerUUIDChallengeUUID, response.data.streamId)
		} else {
			getChatManagerClass().addChallengeEvaluationResultMessage(careerUUIDChallengeUUID, {
				isCorrect: true,
				feedback: response.data.feedback
			})
		}
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to request hint",
			description: "Please reload the page and try again"
		})
	}
}
