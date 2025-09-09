"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editSandboxProjectNotes(projectUUID: SandboxProjectUUID, newProjectNotes: string) : Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		const project = getSandboxClass().sandboxProjects.get(projectUUID)
		if (isUndefined(project) || project.projectName === newProjectNotes) return

		getSandboxClass().updateProjectNotes(projectUUID, newProjectNotes)
		const editSandboxProjectNotesResponse = await getBlueDotApiClientClass().sandboxDataService.editSandboxProjectNotes(
			project.sandboxProjectUUID,
			newProjectNotes
		)
		if (!isEqual(editSandboxProjectNotesResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNotesResponse.data)) {
			throw Error ("Unable to edit sandbox project notes")
		}
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to edit project notes",
			description: "Please reload the page and try again"
		})
		// Re-throw the error so calling code can handle it
		throw error
	}
}
