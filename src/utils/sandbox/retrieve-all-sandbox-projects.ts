"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import sandboxClass from "../../classes/sandbox-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function retrieveAllSandboxProjects(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			sandboxClass.isRetrievingAllSandboxProjects === true ||
			sandboxClass.hasRetrievedAllSandboxProjects === true
		) return


		sandboxClass.setIsRetrievingAllSandboxProjects(true)

		const sandboxProjectsResponse = await leverLabsApiClient.sandboxDataService.retrieveAllSandboxProjects()
		if (!isEqual(sandboxProjectsResponse.status, 200) || isErrorResponse(sandboxProjectsResponse.data)) {
			throw Error ("Unable to retrieve sandbox projects")
		}

		await sandboxClass.setSandboxProjects(sandboxProjectsResponse.data.sandboxProjects)
	} catch (error) {
		console.error(error)
		sandboxClass.setIsRetrievingAllSandboxProjects(false)
	}
}
