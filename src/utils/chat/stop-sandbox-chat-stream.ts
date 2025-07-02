"use client"

import isEqual from "lodash-es/isEqual"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function stopSandboxChatStream(projectUUID: ProjectUUID): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Reset streaming state immediately for UI responsiveness
		sandboxClass.resetChatStreamingState(projectUUID)

		// If you implement stream ID tracking in sandbox class, uncomment this:
		const streamId = sandboxClass.getCurrentStreamId(projectUUID)
		if (streamId) {
			const response = await blueDotApiClientClass.chatDataService.stopChatStream(streamId)
			if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
				console.error("Failed to stop chat stream")
			}
		}

	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to stop chat stream",
			description: "Please try again"
		})
	}
}
