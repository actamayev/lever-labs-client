"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function stopChatStream(chatReset: () => string | null): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const streamId = chatReset()
		if (isNull(streamId)) return

		const response = await blueDotApiClient.chatDataService.stopChatStream(streamId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			console.error("Failed to stop chat stream")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to stop message stream",
			description: "Please reload the page and try again"
		})
	}
}
