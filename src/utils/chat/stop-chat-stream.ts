"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function stopChatStream(chatReset: () => string | null): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		const streamId = chatReset()
		if (isNull(streamId)) return

		const response = await getBlueDotApiClientClass().chatDataService.stopChatStream(streamId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			console.error("Failed to stop chat stream")
		}
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to stop message stream",
			description: "Please reload the page and try again"
		})
	}
}
