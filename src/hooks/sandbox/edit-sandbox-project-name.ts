"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSandboxContext } from "../../classes/sandbox-context"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"
import { ProjectUUID } from "@bluedotrobots/common-ts"

export default function useEditSandboxProjectName(): (
	projectUUID: ProjectUUID,
	newProjectName: string
) => Promise<void> {
	const sandboxClass = useSandboxContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (
		projectUUID: ProjectUUID,
		newProjectName: string
	) => {
		try {
			if (isNull(blueDotApiClient.httpClient.accessToken)) return
			const project = sandboxClass.sandboxProjects.get(projectUUID)
			if (
				isUndefined(project) ||
				project.projectName === newProjectName
			) return

			const editSandboxProjectNameResponse = await blueDotApiClient.sandboxDataService.editSandboxProjectName(
				project.projectUUID,
				newProjectName
			)
			if (!isEqual(editSandboxProjectNameResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNameResponse.data)) {
				throw Error ("Unable to edit sandbox project name")
			}

			sandboxClass.updateProjectName(projectUUID, newProjectName)
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to edit project name",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.sandboxDataService, sandboxClass, toast])
}
