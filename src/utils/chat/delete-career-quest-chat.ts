"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteCareerQuestChat(challengeId: string): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await blueDotApiClientClass.chatDataService.deleteCareerQuestChat(challengeId)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to delete chat")
		}

		// Clear the chat messages from the career quest class
		careerQuestClass.clearMessages(challengeId)

		// Reset chat streaming state
		careerQuestClass.resetChatStreamingState(challengeId)
		return
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete chat",
			description: "Please reload the page and try again"
		})
	}
}
