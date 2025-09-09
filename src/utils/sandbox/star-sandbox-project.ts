"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function starSandboxProject(projectUUID: SandboxProjectUUID) : Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		const project = getSandboxClass().sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const starSandboxProjectResponse = await getBlueDotApiClientClass().sandboxDataService.starSandboxProject(
			project.sandboxProjectUUID,
			!project.isStarred
		)
		if (!isEqual(starSandboxProjectResponse.status, 200) || isNonSuccessResponse(starSandboxProjectResponse.data)) {
			throw Error ("Unable to star sandbox project")
		}

		getSandboxClass().updateStarStatus(projectUUID)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to star sandbox project",
			description: "Please reload the page and try again"
		})
	}
}
