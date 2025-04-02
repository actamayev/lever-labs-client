"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import { useSandboxContext } from "../../contexts/sandbox-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useStarSandboxProject(): (projectUUID: ProjectUUID) => Promise<void> {
	const sandboxClass = useSandboxContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (projectUUID: ProjectUUID) => {
		try {
			if (isNull(blueDotApiClient.httpClient.accessToken)) return
			const project = sandboxClass.sandboxProjects.get(projectUUID)
			if (isUndefined(project)) return

			const createSandboxProjectResponse = await blueDotApiClient.sandboxDataService.starSandboxProject(
				project.projectUUID,
				!project.isStarred
			)
			if (!isEqual(createSandboxProjectResponse.status, 200) || isErrorResponse(createSandboxProjectResponse.data)) {
				throw Error ("Unable to star new sandbox project")
			}

			sandboxClass.updateStarStatus(projectUUID)
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to star sandbox project",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.sandboxDataService, sandboxClass, toast])
}
