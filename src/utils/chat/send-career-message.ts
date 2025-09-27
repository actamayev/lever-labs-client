"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import chatManagerClass from "../../classes/chat-manager-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { CareerUUID } from "@lever-labs/common-ts/types/utils"
import { OutgoingCareerMessage } from "@lever-labs/common-ts/types/chat"

export default async function sendCareerMessage(careerUUID: CareerUUID, careerData: OutgoingCareerMessage): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		chatManagerClass.resetCareerStreamingState(careerUUID)

		const response = await leverLabsApiClient.chatDataService.sendCareerMessage(careerData, careerUUID)

		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) return

		chatManagerClass.setCareerStreamId(careerUUID, response.data.streamId)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send career message",
			description: "Please reload the page and try again"
		})
	}
}
