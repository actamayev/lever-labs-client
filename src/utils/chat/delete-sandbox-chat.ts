"use client"

import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function deleteSandboxChat(projectUUID: SandboxProjectUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await leverLabsApiClient.chatDataService.deleteSandboxChat(projectUUID)

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
