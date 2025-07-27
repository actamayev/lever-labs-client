"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function requestCareerQuestHint(
	careerIdChallengeId: CareerIdChallengeId,
	userCode: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		careerQuestClass.addChallengeHintRequestMessage(careerIdChallengeId)
		careerQuestClass.resetChallengeStreamingState(careerIdChallengeId)

		const response = await blueDotApiClientClass.chatDataService.requestCareerQuestHint({
			...careerIdChallengeId,
			userCode,
		})

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		careerQuestClass.setChallengeStreamId(careerIdChallengeId, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to request hint",
			description: "Please reload the page and try again"
		})
	}
}
