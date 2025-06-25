"use client"

import authClass from "../../classes/auth-class"
import chatsClass from "../../classes/chat-class"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function stopChatStream(challengeId: string): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		if (chatsClass.currentStreamId) {
			await blueDotApiClientClass.chatDataService.stopChatStream(chatsClass.currentStreamId)
			console.log("Stream stopped on backend")
		}

		// Always reset local state
		chatsClass.resetChatState(challengeId)
		chatsClass.setCurrentStreamId(null)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to stop message stream",
			description: "Please reload the page and try again"
		})
	}
}
