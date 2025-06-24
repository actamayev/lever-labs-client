"use client"

import { ChallengeData, ChatMessage } from "@bluedotrobots/common-ts"
import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import chatsClass from "../../classes/chat-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function sendCareerQuestMessage(
	challengeData: ChallengeData,
	cppCode: string,
	inputValue: string,
	conversationHistory: ChatMessage[]
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset chat state for new conversation
		chatsClass.resetChatState(challengeData.id)

		// Send request to backend - challengeId will be included in the WebSocket response
		const response = await blueDotApiClientClass.chatDataService.sendCareerQuestMessage({
			challengeData,
			userCode: cppCode,
			interactionType: "generalQuestion",
			message: inputValue,
			conversationHistory
		})

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		chatsClass.setCurrentStreamId(response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to stop message stream",
			description: "Please reload the page and try again"
		})
	}
}
