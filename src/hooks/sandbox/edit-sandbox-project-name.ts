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

export default function useEditSandboxProjectName(): (
	projectUUID: ProjectUUID,
	newProjectName: string
) => Promise<void> {
	return useCallback(async (
		projectUUID: ProjectUUID,
		newProjectName: string
	) => {
		try {
			if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
			const project = sandboxClass.sandboxProjects.get(projectUUID)
			if (
				isUndefined(project) ||
				project.projectName === newProjectName
			) return

			const editSandboxProjectNameResponse = await blueDotApiClientClass.sandboxDataService.editSandboxProjectName(
				project.projectUUID,
				newProjectName
			)
			if (!isEqual(editSandboxProjectNameResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNameResponse.data)) {
				throw Error ("Unable to edit sandbox project name")
			}

			sandboxClass.updateProjectName(projectUUID, newProjectName)
		} catch (error) {
			console.error(error)
			toastClass.negative({
				title: "Unable to edit project name",
				description: "Please reload the page and try again"
			})
		}
	}, [])
}
