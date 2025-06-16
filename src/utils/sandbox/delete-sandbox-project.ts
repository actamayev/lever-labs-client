"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function deleteSandboxProject(projectUUID: ProjectUUID) : Promise<void> {
	try {
		if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const deleteSandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.deleteSandboxProject(project.projectUUID)
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
