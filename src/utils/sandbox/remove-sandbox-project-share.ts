"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function removeSandboxProjectShare(
	projectUUID: SandboxProjectUUID,
	userIdToUnshareWith: number
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const removeShareResponse = await leverLabsApiClient.sandboxDataService.removeSandboxProjectShare(
			project.sandboxProjectUUID,
			userIdToUnshareWith
		)
		if (!isEqual(removeShareResponse.status, 200) || isNonSuccessResponse(removeShareResponse.data)) {
			throw Error("Unable to remove project share")
		}

		// Update the project's sharedWith array in sandboxClass
		sandboxClass.removeSharedUser(projectUUID, userIdToUnshareWith)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to remove access",
			description: "Please reload the page and try again"
		})
	}
}

