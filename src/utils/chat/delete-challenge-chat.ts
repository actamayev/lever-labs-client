"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"
import chatManagerClass from "../../classes/chat-manager-class"

export default async function deleteChallengeChat(careerUUIDChallengeUUID: CareerUUIDChallengeUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await blueDotApiClient.chatDataService.deleteChallengeChat(careerUUIDChallengeUUID.challengeUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to delete challenge chat")
		}

		chatManagerClass.clearChallengeMessages(careerUUIDChallengeUUID)
		return
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete challenge chat",
			description: "Please reload the page and try again"
		})
	}
}
