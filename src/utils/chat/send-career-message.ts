"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import careerQuestClass from "../../classes/career-quest-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { CareerUUID, OutgoingCareerMessage } from "@bluedotrobots/common-ts"

export default async function sendCareerMessage(careerUUID: CareerUUID, careerData: OutgoingCareerMessage): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		careerQuestClass.resetCareerStreamingState(careerUUID)

		const response = await blueDotApiClientClass.chatDataService.sendCareerMessage(careerData, careerUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		careerQuestClass.setCareerStreamId(careerUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send career message",
			description: "Please reload the page and try again"
		})
	}
}
