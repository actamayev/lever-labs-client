"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import getSandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveAllSandboxProjects(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			getSandboxClass().isRetrievingAllSandboxProjects === true ||
			getSandboxClass().hasRetrievedAllSandboxProjects === true
		) return

		getSandboxClass().setIsRetrievingAllSandboxProjects(true)

		const sandboxProjectsResponse = await blueDotApiClientClass.sandboxDataService.retrieveAllSandboxProjects()
		if (!isEqual(sandboxProjectsResponse.status, 200) || isErrorResponse(sandboxProjectsResponse.data)) {
			throw Error ("Unable to retrieve sandbox projects")
		}

		await getSandboxClass().setSandboxProjects(sandboxProjectsResponse.data.sandboxProjects)
	} catch (error) {
		console.error(error)
		getSandboxClass().setIsRetrievingAllSandboxProjects(false)
	}
}
