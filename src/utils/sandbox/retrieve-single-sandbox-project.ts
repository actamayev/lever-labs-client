"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { useCallback } from "react"

export default function useRetrieveSingleSandboxProject(): (projectUUID: SandboxProjectUUID) => Promise<void> {
	return useCallback(async (projectUUID: SandboxProjectUUID): Promise<void> => {
		try {
		// If we already have the project in the context, no need to fetch it again
			const foundProject = sandboxClass.sandboxProjects.get(projectUUID)
			console.log("foundProject", foundProject)
			if (foundProject) return

			console.log("authClass.isFinishedWithSignup", authClass.isFinishedWithSignup)
			console.log("sandboxClass.isRetrievingSingleProject(projectUUID)", sandboxClass.isRetrievingSingleProject(projectUUID))
			if (
				authClass.isFinishedWithSignup === false ||
			sandboxClass.isRetrievingSingleProject(projectUUID)
			) return

			// Set loading state
			sandboxClass.setIsRetrievingSingleProject(projectUUID, true)

			const sandboxProjectResponse = await blueDotApiClient.sandboxDataService.retrieveSingleSandboxProject(projectUUID)
			if (
				!isEqual(sandboxProjectResponse.status, 200) ||
			isErrorResponse(sandboxProjectResponse.data) ||
			isNull(sandboxProjectResponse.data.sandboxProject)
			) {
				throw Error ("Unable to retrieve sandbox project")
			}

			await sandboxClass.addSandboxProject(sandboxProjectResponse.data.sandboxProject)
		} catch (error) {
			console.error(error)
			sandboxClass.setIsRetrievingSingleProject(projectUUID, false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup, sandboxClass.isRetrievingSingleProject])
}
