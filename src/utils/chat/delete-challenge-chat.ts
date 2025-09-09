"use client"

import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getChatManagerClass from "../../classes/chat-manager-class"

export default async function deleteChallengeChat(careerUUIDChallengeUUID: CareerUUIDChallengeUUID): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await getBlueDotApiClientClass().chatDataService.deleteChallengeChat(careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to delete challenge chat")
		}

		getChatManagerClass().clearChallengeMessages(careerUUIDChallengeUUID)
		return
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to delete challenge chat",
			description: "Please reload the page and try again"
		})
	}
}
