"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"
import chatManagerClass from "../../classes/chat-manager-class"

export default async function sendChallengeChatMessage(
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID,
	message: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const userCode = chatManagerClass.getCppCode(careerUUIDChallengeUUID)

		chatManagerClass.resetChallengeStreamingState(careerUUIDChallengeUUID)
		chatManagerClass.setChallengeStreaming(careerUUIDChallengeUUID, true)

		const response = await blueDotApiClient.chatDataService.sendChallengeMessage({
			careerUUID: careerUUIDChallengeUUID.careerUUID,
			message,
			userCode,
		}, careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		chatManagerClass.setChallengeStreamId(careerUUIDChallengeUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
