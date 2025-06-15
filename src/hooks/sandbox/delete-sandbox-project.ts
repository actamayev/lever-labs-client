"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { ProjectUUID } from "@bluedotrobots/common-ts"

export default function useDeleteSandboxProject(): (projectUUID: ProjectUUID) => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async (projectUUID: ProjectUUID) => {
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
			toast.negative({
				title: "Unable to delete sandbox project",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClientClass.httpClient.accessToken, blueDotApiClientClass.sandboxDataService, sandboxClass, toast])
}
