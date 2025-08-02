"use client"

import isEqual from "lodash-es/isEqual"
import { CareerUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveFullCareerData(careerUUID: CareerUUID): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			careerQuestClass.isRetrievingCareerData(careerUUID)
		) return

		// Set loading state for entire career
		careerQuestClass.setIsRetrievingCareerData(careerUUID, true)

		const careerResponse = await blueDotApiClientClass.careerQuestDataService.retrieveCareerQuestChallengeData(careerUUID)

		if (!isEqual(careerResponse.status, 200) || isErrorResponses(careerResponse.data)) {
			throw Error("Unable to retrieve career data")
		}

		// Get challenge sections to map array indices to challenge UUIDs
		const challengeSections = careerQuestClass.getChallengeSectionByChallengeUUID(careerUUID)

		// Process each challenge's data
		careerResponse.data.careerQuestChallengeData.forEach((challengeData, index) => {
			// Map array index to specific challenge (assuming order matches)
			const challengeSection = challengeSections[index]
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!challengeSection) {
				console.warn(`No challenge section found for index ${index} in career ${careerUUID}`)
				return
			}

			const careerUUIDChallengeUUID = challengeSection.challengeData

			// Transform backend messages to frontend format
			const transformedMessages: CareerQuestChatMessage[] = []

			challengeData.messages.forEach(msg => {
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

			const isCompleted = challengeData.hasEverBeenCorrect

			careerQuestClass.setChallengeRetrievedData(
				careerUUIDChallengeUUID,
				transformedMessages,
				challengeData.sandboxJson,
				isCompleted
			)
		})

		// Clear loading state for entire career
		careerQuestClass.setIsRetrievingCareerData(careerUUID, false)
	} catch (error) {
		console.error(error)
		careerQuestClass.setIsRetrievingCareerData(careerUUID, false)
	}
}
