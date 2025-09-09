"use client"

import isEqual from "lodash-es/isEqual"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
import { ChallengeUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editCareerQuestSandboxProject(
	challengeUUID: ChallengeUUID,
	newBlocklyJson: BlocklyJson
) : Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		const editCareerQuestSandboxProjectResponse = await getBlueDotApiClientClass().careerQuestDataService.editCareerQuestSandboxProject(
			challengeUUID,
			newBlocklyJson
		)
		if (!isEqual(editCareerQuestSandboxProjectResponse.status, 200) || isErrorResponses(editCareerQuestSandboxProjectResponse.data)) {
			throw Error ("Unable to edit sandbox project")
		}
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to edit project",
			description: "Please reload the page and try again"
		})
	}
}
