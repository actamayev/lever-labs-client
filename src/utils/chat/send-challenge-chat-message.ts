"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getChatManagerClass from "../../classes/chat-manager-class"

export default async function sendChallengeChatMessage(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID,
	message: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const userCode = getChatManagerClass().getCppCode(careerUUIDChallengeUUID)

		getChatManagerClass().resetChallengeStreamingState(careerUUIDChallengeUUID)
		getChatManagerClass().setChallengeStreaming(careerUUIDChallengeUUID, true)

		const response = await blueDotApiClientClass.chatDataService.sendChallengeMessage({
			careerUUID: careerUUIDChallengeUUID.careerUUID,
			message,
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		getChatManagerClass().setChallengeStreamId(careerUUIDChallengeUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
