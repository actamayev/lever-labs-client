"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function starSandboxProject(projectUUID: SandboxProjectUUID) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const starSandboxProjectResponse = await leverLabsApiClient.sandboxDataService.starSandboxProject(
			project.sandboxProjectUUID,
			!project.isStarred
		)
		if (!isEqual(starSandboxProjectResponse.status, 200) || isNonSuccessResponse(starSandboxProjectResponse.data)) {
			throw Error ("Unable to star sandbox project")
		}

		sandboxClass.updateStarStatus(projectUUID)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to star sandbox project",
			description: "Please reload the page and try again"
		})
	}
}
