"use client"

import isEqual from "lodash-es/isEqual"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getChatManagerClass from "../../classes/chat-manager-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteCareerChat(careerUUID: CareerUUID): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await getBlueDotApiClientClass().chatDataService.deleteCareerChat(careerUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to delete chat")
		}

		getChatManagerClass().clearCareerChatMessages(careerUUID)
		return
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to delete chat",
			description: "Please reload the page and try again"
		})
	}
}
