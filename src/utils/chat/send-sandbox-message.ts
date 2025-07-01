"use client"

import isEqual from "lodash-es/isEqual"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import sandboxClass from "../../classes/sandbox-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function sendSandboxMessage(
	projectUUID: ProjectUUID,
	userCode: string,
	message: string,
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset chat streaming state for new conversation
		sandboxClass.resetChatStreamingState(projectUUID)

		// Send request to backend - projectUUID will be included in the WebSocket response
		const response = await blueDotApiClientClass.chatDataService.sendSandboxMessage(
			projectUUID,
			{ userCode, message }
		)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		// Set stream ID if you implement stream ID management in sandbox class
		sandboxClass.setCurrentStreamId(projectUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
