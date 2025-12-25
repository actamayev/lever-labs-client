"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { SingleSearchByUsernameResult } from "@actamayev/lever-labs-common-ts/types/sandbox"

export default async function shareSandboxProject(
	projectUUID: SandboxProjectUUID,
	userIdSharedWith: number,
	userInfo?: SingleSearchByUsernameResult
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const shareResponse = await leverLabsApiClient.sandboxDataService.shareSandboxProject(
			project.sandboxProjectUUID,
			userIdSharedWith
		)
		if (!isEqual(shareResponse.status, 200) || isNonSuccessResponse(shareResponse.data)) {
			throw Error("Unable to share sandbox project")
		}

		// Update the project's sharedWith array in sandboxClass
		if (userInfo) {
			sandboxClass.addSharedUser(projectUUID, {
				userId: userIdSharedWith,
				username: userInfo.username,
				name: userInfo.name,
				profilePictureUrl: userInfo.profilePictureUrl
			})
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to share project",
			description: "Please reload the page and try again"
		})
	}
}

