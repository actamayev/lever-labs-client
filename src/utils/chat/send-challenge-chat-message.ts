"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function sendChallengeChatMessage(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID,
	message: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const userCode = careerQuestClass.getCppCode(careerUUIDChallengeUUID)

		careerQuestClass.resetChallengeStreamingState(careerUUIDChallengeUUID)
		careerQuestClass.setChallengeStreaming(careerUUIDChallengeUUID, true)

		const response = await blueDotApiClientClass.chatDataService.sendChallengeMessage({
			careerUUID: careerUUIDChallengeUUID.careerUUID,
			message,
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		careerQuestClass.setChallengeStreamId(careerUUIDChallengeUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
