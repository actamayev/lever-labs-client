"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import chatsClass from "../../classes/chat-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponses } from "../type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function stopCqChatStream(challengeId: string): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset streaming state immediately for UI responsiveness
		chatsClass.resetChatState(challengeId)

		// Get stream ID for this specific challenge and stop it
		const streamId = chatsClass.getCurrentStreamId(challengeId)
		if (streamId) {
			const response = await blueDotApiClientClass.chatDataService.stopChatStream(streamId)
			if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
				console.error("Failed to stop chat stream")
			}
		}

	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to stop message stream",
			description: "Please reload the page and try again"
		})
	}
}
