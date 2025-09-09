"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function editSandboxProjectName(projectUUID: SandboxProjectUUID, newProjectName: string): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project) || project.projectName === newProjectName) return

		sandboxClass.updateProjectName(projectUUID, newProjectName)
		const editSandboxProjectNameResponse = await blueDotApiClient.sandboxDataService.editSandboxProjectName(
			project.sandboxProjectUUID,
			newProjectName
		)
		if (!isEqual(editSandboxProjectNameResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNameResponse.data)) {
			throw Error ("Unable to edit sandbox project name")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to edit project name",
			description: "Please reload the page and try again"
		})
		// Re-throw the error so calling code can handle it
		throw error
	}
}
