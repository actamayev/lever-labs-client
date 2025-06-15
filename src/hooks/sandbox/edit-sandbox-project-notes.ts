"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSandboxContext } from "../../classes/sandbox-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { ProjectUUID } from "@bluedotrobots/common-ts"

export default function useEditSandboxProjectNotes(): (
	projectUUID: ProjectUUID,
	newProjectNotes: string
) => Promise<void> {
	const sandboxClass = useSandboxContext()
	const toast = useToastOptions()

	return useCallback(async (
		projectUUID: ProjectUUID,
		newProjectNotes: string
	) => {
		try {
			if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
			const project = sandboxClass.sandboxProjects.get(projectUUID)
			if (
				isUndefined(project) ||
				project.projectName === newProjectNotes
			) return

			const editSandboxProjectNotesResponse = await blueDotApiClientClass.sandboxDataService.editSandboxProjectNotes(
				project.projectUUID,
				newProjectNotes
			)
			if (!isEqual(editSandboxProjectNotesResponse.status, 200) || isNonSuccessResponse(editSandboxProjectNotesResponse.data)) {
				throw Error ("Unable to edit sandbox project notes")
			}

			sandboxClass.updateProjectNotes(projectUUID, newProjectNotes)
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to edit project notes",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClientClass.httpClient.accessToken, blueDotApiClientClass.sandboxDataService, sandboxClass, toast])
}
