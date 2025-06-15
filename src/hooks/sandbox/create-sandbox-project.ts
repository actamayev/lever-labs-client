"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { ProjectUUID } from "@bluedotrobots/common-ts"

export default function useCreateSandboxProject(): () => Promise<ProjectUUID | undefined> {
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			if (isNull(blueDotApiClientClass.httpClient.accessToken)) return

			const createSandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.createSandboxProject()
			if (!isEqual(createSandboxProjectResponse.status, 200) || isErrorResponse(createSandboxProjectResponse.data)) {
				throw Error ("Unable to create new sandbox project")
			}

			sandboxClass.addSandboxProject(createSandboxProjectResponse.data.sandboxProject)
			return createSandboxProjectResponse.data.sandboxProject.projectUUID
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to create sandbox project",
				description: "Please reload the page and try again"
			})
		}
	}, [toast])
}
