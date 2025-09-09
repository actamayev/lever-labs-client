"use client"

import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getChatManagerClass from "../../classes/chat-manager-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import { OutgoingCareerMessage } from "@bluedotrobots/common-ts/types/chat"

export default async function sendCareerMessage(careerUUID: CareerUUID, careerData: OutgoingCareerMessage): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		getChatManagerClass().resetCareerStreamingState(careerUUID)

		const response = await getBlueDotApiClientClass().chatDataService.sendCareerMessage(careerData, careerUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		getChatManagerClass().setCareerStreamId(careerUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to send career message",
			description: "Please reload the page and try again"
		})
	}
}
