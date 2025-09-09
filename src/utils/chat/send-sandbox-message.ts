"use client"

import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function sendSandboxMessage(
	projectUUID: SandboxProjectUUID,
	message: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset chat streaming state for new conversation
		getSandboxClass().resetChatStreamingState(projectUUID)
		const userCode = getSandboxClass().getCppCode(projectUUID)

		// Send request to backend - projectUUID will be included in the WebSocket response
		const response = await blueDotApiClientClass.chatDataService.sendSandboxMessage(
			projectUUID,
			{ userCode, message }
		)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		// Set stream ID if you implement stream ID management in sandbox class
		getSandboxClass().setCurrentStreamId(projectUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send message",
			description: "Please reload the page and try again"
		})
	}
}
