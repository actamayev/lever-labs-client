"use client"

import isEqual from "lodash-es/isEqual"
import { BlocklyJson, ChallengeUUID } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editCareerQuestSandboxProject(
	challengeUUID: ChallengeUUID,
	newBlocklyJson: BlocklyJson
) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const editCareerQuestSandboxProjectResponse = await blueDotApiClientClass.careerQuestDataService.editCareerQuestSandboxProject(
			challengeUUID,
			newBlocklyJson
		)
		if (!isEqual(editCareerQuestSandboxProjectResponse.status, 200) || isErrorResponses(editCareerQuestSandboxProjectResponse.data)) {
			throw Error ("Unable to edit sandbox project")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to edit project",
			description: "Please reload the page and try again"
		})
	}
}
