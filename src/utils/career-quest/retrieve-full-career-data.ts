"use client"

import isEqual from "lodash-es/isEqual"
import { CareerUUID, ChallengeUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

// eslint-disable-next-line max-lines-per-function
export default async function retrieveFullCareerData(careerUUID: CareerUUID): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			careerQuestClass.isRetrievingCareerData(careerUUID) ||
			careerQuestClass.hasRetrievedAllChallengesForCareer(careerUUID)
		) return

		// Set loading state for entire career
		careerQuestClass.setIsRetrievingCareerData(careerUUID, true)

		const careerResponse = await blueDotApiClientClass.careerQuestDataService.retrieveCareerProgressData(careerUUID)

		if (!isEqual(careerResponse.status, 200) || isErrorResponses(careerResponse.data)) {
			throw Error("Unable to retrieve career data")
		}

		// Get challenge sections to create a lookup map
		const challengeSections = careerQuestClass.getChallengeSectionByChallengeUUID(careerUUID)

		// Create a map for quick lookup: challengeUUID -> challengeSection
		const challengeMap = new Map(
			challengeSections.map((section): [ChallengeUUID, ChallengeSection] => [section.challengeData.challengeUUID, section])
		)

		// Process each challenge's data by matching challengeUUID
		careerResponse.data.careerQuestChallengeData.forEach((challengeData): void => {
			// Find the matching challenge section by UUID
			const challengeSection = challengeMap.get(challengeData.challengeUUID)

			if (!challengeSection) {
				console.warn(`No challenge section found for challengeUUID ${challengeData.challengeUUID} in career ${careerUUID}`)
				return
			}

			// Create the proper CareerUUIDChallengeUUID object
			const careerUUIDChallengeUUID = {
				careerUUID: careerUUID,
				challengeUUID: challengeData.challengeUUID
			}

			// Transform backend messages to frontend format
			const transformedMessages: ChallengeChatMessage[] = []

			challengeData.messages.forEach((msg): void => {
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

		// NEW: Process and set career chat messages
		const transformedCareerChatMessages: CareerChatMessage[] = careerResponse.data.careerChatMessages.map((msg): CareerChatMessage => {
			// Convert timestamp string back to Date object
			const timestamp = new Date(msg.timestamp)

			return {
				...msg, // Spread SandboxChatMessage properties (content, role, timestamp)
				timestamp, // Use the converted Date object
				id: `${msg.role.toLowerCase()}-${timestamp.getTime()}`, // Generate unique ID
				isStreaming: false // Default to not streaming for retrieved messages
			}
		})

		// Set the career chat messages in the career quest class
		careerQuestClass.setCareerChatRetrievedData(careerUUID, transformedCareerChatMessages)

		// UPDATED: Set saved position and seen challenges from API response
		const savedPosition = careerResponse.data.currentChallengeUuidOrTextUuid || ""
		const seenChallengeUUIDs = careerResponse.data.seenChallengeUUIDs
		const furthestSeenPosition = careerResponse.data.furthestSeenChallengeUuidOrTextUuid || ""

		careerQuestClass.setSavedPosition(careerUUID, savedPosition) // Remove isLocked parameter
		careerQuestClass.setSeenChallenges(careerUUID, seenChallengeUUIDs) // NEW method
		careerQuestClass.setFurthestSeenPosition(careerUUID, furthestSeenPosition) // NEW: Set furthest seen position

		// Clear loading state for entire career
		careerQuestClass.setIsRetrievingCareerData(careerUUID, false)
		careerQuestClass.setHasRetrievedAllChallengesForCareer(careerUUID, true)
	} catch (error) {
		console.error(error)
		careerQuestClass.setIsRetrievingCareerData(careerUUID, false)
	}
}
