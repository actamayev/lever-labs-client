"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function starSandboxProject(projectUUID: ProjectUUID) : Promise<void> {
	try {
		if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
		const project = sandboxClass.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const starSandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.starSandboxProject(
			project.projectUUID,
			!project.isStarred
		)
		if (!isEqual(starSandboxProjectResponse.status, 200) || isNonSuccessResponse(starSandboxProjectResponse.data)) {
			throw Error ("Unable to star sandbox project")
		}

		sandboxClass.updateStarStatus(projectUUID)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to star sandbox project",
			description: "Please reload the page and try again"
		})
	}
}
