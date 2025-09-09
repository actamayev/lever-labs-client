"use client"

import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editSandboxProject(projectUUID: SandboxProjectUUID, newBlocklyJson: BlocklyJson) : Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		const project = getSandboxClass().sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const editSandboxProjectResponse = await getBlueDotApiClientClass().sandboxDataService.editSandboxProject(
			projectUUID,
			newBlocklyJson
		)
		if (!isEqual(editSandboxProjectResponse.status, 200) || isNonSuccessResponse(editSandboxProjectResponse.data)) {
			throw Error ("Unable to edit sandbox project")
		}
		getSandboxClass().updateProjectLastUpdated(projectUUID)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to edit project",
			description: "Please reload the page and try again"
		})
	}
}
