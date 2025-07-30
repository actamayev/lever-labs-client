"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveCareerQuestChallengeData(careerUUIDChallengeUUID: CareerUUIDChallengeUUID): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			careerQuestClass.isRetrievingChallengeData(careerUUIDChallengeUUID) ||
			careerQuestClass.hasRetrievedChallengeData(careerUUIDChallengeUUID)
		) return

		// Set loading state
		careerQuestClass.setIsRetrievingChallengeData(careerUUIDChallengeUUID, true)

		const challengeResponse = await blueDotApiClientClass.careerQuestDataService.retrieveCareerQuestChallengeData(
			careerUUIDChallengeUUID.challengeUUID
		)
		if (!isEqual(challengeResponse.status, 200) || isErrorResponses(challengeResponse.data)) {
			throw Error("Unable to retrieve challenge data")
		}

		// Transform backend messages to frontend format
		const transformedMessages: CareerQuestChatMessage[] = []

		challengeResponse.data.messages.forEach(msg => {
			const timestamp = new Date(msg.timestamp)

			// If this is a code submission, create two messages: the user request and the model's feedback
			if (msg.codeSubmissionData) {
				// 1. User's check code request message
				transformedMessages.push({
					id: `user-checkCode-${timestamp.getTime()}`,
					role: "user",
					content: "Is my code correct?",
					timestamp: timestamp,
					isCheckCodeRequest: true
				})

				// 2. Model's feedback message
				transformedMessages.push({
					id: `assistant-feedback-${timestamp.getTime()}`,
					role: "assistant",
					content: msg.codeSubmissionData.evaluationResult.feedback || "",
					timestamp: timestamp,
					evaluationResult: msg.codeSubmissionData.evaluationResult
				})
			} else if (msg.isHint) {
				transformedMessages.push({
					id: `user-hintRequest-${timestamp.getTime()}`,
					role: "user",
					content: "Can you please give me a hint?",
					timestamp: timestamp,
					isHintRequest: true
				})

				// 2. Model's hint response message
				transformedMessages.push({
					id: `${msg.role.toLowerCase()}-${timestamp.getTime()}`,
					role: msg.role,
					content: msg.content,
					timestamp: timestamp,
					isHintResponse: true
				})
			} else {
				// Normal message (not a code submission)
				transformedMessages.push({
					id: `${msg.role.toLowerCase()}-${timestamp.getTime()}`,
					role: msg.role,
					content: msg.content,
					timestamp: timestamp
				})
			}
		})

		const isCompleted = challengeResponse.data.hasEverBeenCorrect

		careerQuestClass.setChallengeRetrievedData(
			careerUUIDChallengeUUID,
			transformedMessages,
			challengeResponse.data.sandboxJson,
			isCompleted
		)
	} catch (error) {
		console.error(error)
		careerQuestClass.setIsRetrievingChallengeData(careerUUIDChallengeUUID, false)
	}
}
