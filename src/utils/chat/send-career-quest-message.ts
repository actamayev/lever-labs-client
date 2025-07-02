"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import chatsClass from "../../classes/chat-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function sendCareerQuestMessage(
	careerQuestChallengeId: string,
	userCode: string,
	message: string,
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset chat state for new conversation
		chatsClass.resetChatState(careerQuestChallengeId)

		// Send request to backend - challengeId will be included in the WebSocket response
		const response = await blueDotApiClientClass.chatDataService.sendCareerQuestMessage({
			careerQuestChallengeId,
			userCode,
			interactionType: "generalQuestion",
			message,
		})

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		chatsClass.setCurrentStreamId(careerQuestChallengeId, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
