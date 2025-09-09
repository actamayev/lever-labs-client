"use client"

import isEqual from "lodash-es/isEqual"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import getChatManagerClass from "../../classes/chat-manager-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteCareerChat(careerUUID: CareerUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await blueDotApiClientClass.chatDataService.deleteCareerChat(careerUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Unable to delete chat")
		}

		getChatManagerClass().clearCareerChatMessages(careerUUID)
		return
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete chat",
			description: "Please reload the page and try again"
		})
	}
}
