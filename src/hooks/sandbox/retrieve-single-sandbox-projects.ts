"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import { useSandboxContext } from "../../contexts/sandbox-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { ProjectUUID } from "@bluedotrobots/common-ts"

export default function useRetrieveSingleSandboxProjectUseEffect(projectUUID: ProjectUUID): void {
	const sandboxClass = useSandboxContext()
	const blueDotApiClient = useApiClientContext()

	const retrieveSingleSandboxProject = useCallback(async () => {
		try {
			// If we already have the project in the context, no need to fetch it again
			const foundProject = sandboxClass.sandboxProjects.get(projectUUID)
			if (foundProject) return

			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				sandboxClass.isRetrievingSingleProject(projectUUID)
			) return

			// Set loading state
			sandboxClass.setIsRetrievingSingleProject(projectUUID, true)

			const sandboxProjectResponse = await blueDotApiClient.sandboxDataService.retrieveSingleSandboxProject(projectUUID)
			if (!isEqual(sandboxProjectResponse.status, 200) || isErrorResponse(sandboxProjectResponse.data)) {
				throw Error ("Unable to retrieve sandbox project")
			}

			sandboxClass.addSandboxProject(sandboxProjectResponse.data.sandboxProject)
			sandboxClass.setIsRetrievingSingleProject(projectUUID, false)
		} catch (error) {
			console.error(error)
			sandboxClass.setIsRetrievingSingleProject(projectUUID, false)
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.sandboxDataService, projectUUID, sandboxClass])

	useEffect(() => {
		void retrieveSingleSandboxProject()
	}, [retrieveSingleSandboxProject])
}
