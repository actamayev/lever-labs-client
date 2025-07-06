"use client"

import isEqual from "lodash-es/isEqual"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveCareerQuestChallengeData(challengeId: string): Promise<void> {
	try {
		// If we already have retrieved messages for this challenge, no need to fetch again
		if (careerQuestClass.hasRetrievedMessages(challengeId)) return

		if (
			authClass.isFinishedWithSignup === false ||
			careerQuestClass.isRetrievingMessages(challengeId)
		) return

		// Set loading state
		careerQuestClass.setIsRetrievingMessages(challengeId, true)

		const challengeResponse = await blueDotApiClientClass.careerQuestDataService.retrieveCareerQuestChallengeData(challengeId)
		if (!isEqual(challengeResponse.status, 200) || isErrorResponses(challengeResponse.data)) {
			throw Error("Unable to retrieve challenge data")
		}

		// Transform backend messages to frontend format
		const transformedMessages = challengeResponse.data.messages.map(msg => {
			const timestamp = new Date(msg.timestamp)
			return {
				id: `${msg.role.toLowerCase()}-${timestamp.getTime()}`,
				role: msg.role,
				content: msg.content,
				timestamp: timestamp
			}
		})

		// Extract sandbox JSON - it should be a BlocklyJson object
		const sandboxJson: BlocklyJson | null = challengeResponse.data.sandboxJson
			? challengeResponse.data.sandboxJson as BlocklyJson
			: null

		console.log(transformedMessages)
		careerQuestClass.setRetrievedData(challengeId, transformedMessages, sandboxJson)
	} catch (error) {
		console.error(error)
		careerQuestClass.setIsRetrievingMessages(challengeId, false)
	}
}
