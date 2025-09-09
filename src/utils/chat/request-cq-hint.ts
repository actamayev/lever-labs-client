"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getChatManagerClass from "../../classes/chat-manager-class"

export default async function requestCareerQuestHint(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const userCode = getChatManagerClass().getCppCode(careerUUIDChallengeUUID)
		getChatManagerClass().addChallengeHintRequestMessage(careerUUIDChallengeUUID)
		getChatManagerClass().resetChallengeStreamingState(careerUUIDChallengeUUID)

		const response = await blueDotApiClientClass.chatDataService.requestChallengeHint({
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
		toastClass.negative({
			title: "Unable to request hint",
			description: "Please reload the page and try again"
		})
	}
}
