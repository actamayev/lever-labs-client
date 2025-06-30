"use client"

import isEqual from "lodash-es/isEqual"
import chatsClass from "../../classes/chat-class"
import { isErrorResponses } from "../type-checks"
import authClass from "../../classes/auth-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveCareerQuestChat(challengeId: string): Promise<void> {
	try {
		// If we already have retrieved messages for this challenge, no need to fetch again
		if (chatsClass.hasRetrievedMessages(challengeId)) return

		if (
			authClass.isFinishedWithSignup === false ||
			chatsClass.isRetrievingMessages(challengeId)
		) return

		// Set loading state
		chatsClass.setIsRetrievingMessages(challengeId, true)

		const chatResponse = await blueDotApiClientClass.chatDataService.getCareerQuestChat(challengeId)
		if (!isEqual(chatResponse.status, 200) || isErrorResponses(chatResponse.data)) {
			throw Error("Unable to retrieve chat messages")
		}

		// Transform backend messages to frontend format
		const transformedMessages = chatResponse.data.chatData.map(msg => ({
			id: `${msg.role.toLowerCase()}-${msg.timestamp}`,
			role: msg.role,
			content: msg.content,
			timestamp: new Date(msg.timestamp)
		}))

		chatsClass.setRetrievedMessages(challengeId, transformedMessages)
	} catch (error) {
		console.error(error)
		chatsClass.setIsRetrievingMessages(challengeId, false)
	}
}
