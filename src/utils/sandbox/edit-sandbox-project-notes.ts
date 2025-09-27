"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function editSandboxProjectNotes(projectUUID: SandboxProjectUUID, newProjectNotes: string) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project) || project.projectName === newProjectNotes) return

		sandboxClass.updateProjectNotes(projectUUID, newProjectNotes)
		const editSandboxProjectNotesResponse = await leverLabsApiClient.sandboxDataService.editSandboxProjectNotes(
			project.sandboxProjectUUID,
			newProjectNotes
		)
		if (!isEqual(editSandboxProjectNotesResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNotesResponse.data)) {
			throw Error ("Unable to edit sandbox project notes")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to edit project notes",
			description: "Please reload the page and try again"
		})
		// Re-throw the error so calling code can handle it
		throw error
	}
}
