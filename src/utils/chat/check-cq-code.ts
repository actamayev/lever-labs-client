"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function checkCareerQuestCode(
	careerQuestChallengeId: string,
	userCode: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		careerQuestClass.addCheckCodeRequestMessage(careerQuestChallengeId)
		// Reset chat state for new conversation
		careerQuestClass.resetChatStreamingState(careerQuestChallengeId)

		// Send request to backend - challengeId will be included in the WebSocket response
		const response = await blueDotApiClientClass.chatDataService.checkCareerQuestCode({
			careerQuestChallengeId,
			userCode,
		})

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) return

		careerQuestClass.setCurrentStreamId(careerQuestChallengeId, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
