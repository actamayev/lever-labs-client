"use client"

import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteSandboxChat(projectUUID: SandboxProjectUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await blueDotApiClientClass.chatDataService.deleteSandboxChat(projectUUID)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Unable to delete chat")
		}

		// Clear the chat messages from the sandbox class
		sandboxClass.clearChatMessages(projectUUID)
		return
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete chat",
			description: "Please reload the page and try again"
		})
	}
}
