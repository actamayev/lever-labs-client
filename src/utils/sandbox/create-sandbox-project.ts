"use client"

import isEqual from "lodash-es/isEqual"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import getSandboxClass from "../../classes/sandbox-class"
import { isErrorResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function createSandboxProject(): Promise<SandboxProjectUUID | undefined> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const createSandboxProjectResponse = await blueDotApiClientClass.sandboxDataService.createSandboxProject()
		if (!isEqual(createSandboxProjectResponse.status, 200) || isErrorResponse(createSandboxProjectResponse.data)) {
			throw Error ("Unable to create new sandbox project")
		}

		await getSandboxClass().addSandboxProject(createSandboxProjectResponse.data.sandboxProject)
		return createSandboxProjectResponse.data.sandboxProject.sandboxProjectUUID
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to create sandbox project",
			description: "Please reload the page and try again"
		})
		return undefined
	}
}
