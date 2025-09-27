"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default async function editSandboxProject(projectUUID: SandboxProjectUUID, newBlocklyJson: BlocklyJson) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const editSandboxProjectResponse = await blueDotApiClient.sandboxDataService.editSandboxProject(
			projectUUID,
			newBlocklyJson
		)
		if (!isEqual(editSandboxProjectResponse.status, 200) || isNonSuccessResponse(editSandboxProjectResponse.data)) {
			throw Error ("Unable to edit sandbox project")
		}
		sandboxClass.updateProjectLastUpdated(projectUUID)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to edit project",
			description: "Please reload the page and try again"
		})
	}
}
