"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import { useSandboxContext } from "../../contexts/sandbox-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useCreateSandboxProject(): () => Promise<void> {
	const sandboxClass = useSandboxContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (isNull(blueDotApiClient.httpClient.accessToken)) return

			const createSandboxProjectResponse = await blueDotApiClient.sandboxDataService.createSandboxProject()
			if (!isEqual(createSandboxProjectResponse.status, 200) || isErrorResponse(createSandboxProjectResponse.data)) {
				throw Error ("Unable to create new sandbox project")
			}

			sandboxClass.addSandboxProject(createSandboxProjectResponse.data.sandboxProject)
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to create sandbox project",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.sandboxDataService, sandboxClass, toast])
}
