"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import sandboxClass from "../../classes/sandbox-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveAllSandboxProjects(): Promise<void> {
	try {
		if (
			isNull(blueDotApiClientClass.httpClient.accessToken) ||
			sandboxClass.isRetrievingAllSandboxProjects === true ||
			sandboxClass.hasRetrievedAllSandboxProjects === true
		) return

		sandboxClass.setIsRetrievingAllSandboxProjects(true)

		const sandboxProjectsResponse = await blueDotApiClientClass.sandboxDataService.retrieveAllSandboxProjects()
		if (!isEqual(sandboxProjectsResponse.status, 200) || isErrorResponse(sandboxProjectsResponse.data)) {
			throw Error ("Unable to retrieve sandbox projects")
		}

		sandboxClass.setSandboxProjects(sandboxProjectsResponse.data.sandboxProjects)

		sandboxClass.setHasRetrievedAllSandboxProjects(true)
		sandboxClass.setIsRetrievingAllSandboxProjects(false)
	} catch (error) {
		console.error(error)
		sandboxClass.setIsRetrievingAllSandboxProjects(false)
	}
}
