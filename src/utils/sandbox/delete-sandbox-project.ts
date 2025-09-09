"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"

export default async function deleteSandboxProject(projectUUID: SandboxProjectUUID) : Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		const project = getSandboxClass().sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const deleteSandboxProjectResponse = await getBlueDotApiClientClass().sandboxDataService.deleteSandboxProject(
			project.sandboxProjectUUID
		)
		if (!isEqual(deleteSandboxProjectResponse.status, 200) || isNonSuccessResponse(deleteSandboxProjectResponse.data)) {
			throw Error ("Unable to delete sandbox project")
		}

		getSandboxClass().deleteSandboxProject(projectUUID)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to delete sandbox project",
			description: "Please reload the page and try again"
		})
	}
}
