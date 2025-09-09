"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editSandboxProjectName(projectUUID: SandboxProjectUUID, newProjectName: string): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		const project = getSandboxClass().sandboxProjects.get(projectUUID)
		if (isUndefined(project) || project.projectName === newProjectName) return

		getSandboxClass().updateProjectName(projectUUID, newProjectName)
		const editSandboxProjectNameResponse = await getBlueDotApiClientClass().sandboxDataService.editSandboxProjectName(
			project.sandboxProjectUUID,
			newProjectName
		)
		if (!isEqual(editSandboxProjectNameResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNameResponse.data)) {
			throw Error ("Unable to edit sandbox project name")
		}
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to edit project name",
			description: "Please reload the page and try again"
		})
		// Re-throw the error so calling code can handle it
		throw error
	}
}
