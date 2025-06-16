"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import sandboxClass from "../../classes/sandbox-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useEditSandboxProject(): (
	projectUUID: ProjectUUID,
	newXml: string
) => Promise<void> {
	return useCallback(async (
		projectUUID: ProjectUUID,
		newXml: string
	) => {
		try {
			if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
			const project = sandboxClass.sandboxProjects.get(projectUUID)
			if (isUndefined(project)) return

			const createSandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.editSandboxProject(
				project.projectUUID,
				newXml
			)
			if (!isEqual(createSandboxProjectResponse.status, 200) || isNonSuccessResponse(createSandboxProjectResponse.data)) {
				throw Error ("Unable to edit sandbox project")
			}
			sandboxClass.updateProjectLastUpdated(project.projectUUID)
		} catch (error) {
			console.error(error)
			toastClass.negative({
				title: "Unable to edit project",
				description: "Please reload the page and try again"
			})
		}
	}, [])
}
