"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { SandboxProjectUUID } from "@actamayev/lever-labs-common-ts/types/utils"

export default async function deleteSandboxProject(projectUUID: SandboxProjectUUID) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const deleteSandboxProjectResponse = await leverLabsApiClient.sandboxDataService.deleteSandboxProject(
			project.sandboxProjectUUID
		)
		if (!isEqual(deleteSandboxProjectResponse.status, 200) || isNonSuccessResponse(deleteSandboxProjectResponse.data)) {
			throw Error ("Unable to delete sandbox project")
		}

		sandboxClass.deleteSandboxProject(projectUUID)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to delete sandbox project",
			description: "Please reload the page and try again"
		})
	}
}
