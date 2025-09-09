"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveSingleSandboxProject(projectUUID: SandboxProjectUUID): Promise<void> {
	try {
		// If we already have the project in the context, no need to fetch it again
		const foundProject = sandboxClass.sandboxProjects.get(projectUUID)
		if (foundProject) return

		if (
			authClass.isFinishedWithSignup === false ||
			sandboxClass.isRetrievingSingleProject(projectUUID)
		) return

		// Set loading state
		sandboxClass.setIsRetrievingSingleProject(projectUUID, true)

		const sandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.retrieveSingleSandboxProject(projectUUID)
		if (
			!isEqual(sandboxProjectResponse.status, 200) ||
			isErrorResponse(sandboxProjectResponse.data) ||
			isNull(sandboxProjectResponse.data.sandboxProject)
		) {
			throw Error ("Unable to retrieve sandbox project")
		}

		sandboxClass.addSandboxProject(sandboxProjectResponse.data.sandboxProject)
	} catch (error) {
		console.error(error)
		sandboxClass.setIsRetrievingSingleProject(projectUUID, false)
	}
}
