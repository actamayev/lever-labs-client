"use client"

import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteSandboxChat(projectUUID: SandboxProjectUUID): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		// Call the delete endpoint
		const response = await getBlueDotApiClientClass().chatDataService.deleteSandboxChat(projectUUID)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Unable to delete chat")
		}

		// Clear the chat messages from the sandbox class
		getSandboxClass().clearChatMessages(projectUUID)
		return
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to delete chat",
			description: "Please reload the page and try again"
		})
	}
}
