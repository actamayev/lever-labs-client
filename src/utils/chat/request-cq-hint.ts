"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import chatManagerClass from "../../classes/chat-manager-class"

export default async function requestCareerQuestHint(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const userCode = chatManagerClass.getCppCode(careerUUIDChallengeUUID)
		chatManagerClass.addChallengeHintRequestMessage(careerUUIDChallengeUUID)
		chatManagerClass.resetChallengeStreamingState(careerUUIDChallengeUUID)

		const response = await leverLabsApiClient.chatDataService.requestChallengeHint({
			careerUUID: careerUUIDChallengeUUID.careerUUID,
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to request hint")
		}

		if ("streamId" in response.data) {
			chatManagerClass.setChallengeStreamId(careerUUIDChallengeUUID, response.data.streamId)
		} else {
			chatManagerClass.addChallengeEvaluationResultMessage(careerUUIDChallengeUUID, {
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
