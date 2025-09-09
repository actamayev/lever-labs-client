"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getSandboxClass from "../../classes/sandbox-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveAllSandboxProjects(): Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			getSandboxClass().isRetrievingAllSandboxProjects === true ||
			getSandboxClass().hasRetrievedAllSandboxProjects === true
		) return

		getSandboxClass().setIsRetrievingAllSandboxProjects(true)

		const sandboxProjectsResponse = await getBlueDotApiClientClass().sandboxDataService.retrieveAllSandboxProjects()
		if (!isEqual(sandboxProjectsResponse.status, 200) || isErrorResponse(sandboxProjectsResponse.data)) {
			throw Error ("Unable to retrieve sandbox projects")
		}

		await getSandboxClass().setSandboxProjects(sandboxProjectsResponse.data.sandboxProjects)
	} catch (error) {
		console.error(error)
		getSandboxClass().setIsRetrievingAllSandboxProjects(false)
	}
}
