"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"
import pipClass from "../../../classes/pip-class"
import toastClass from "../../../classes/toast-class"

export default async function s1P1Trigger() : Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const introS1P7Message = MessageBuilder.createIntroS1P7Message()

			await serialConnectionManagerClass.sendBinaryMessage(introS1P7Message)
			return
		}

		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		await blueDotApiClientClass.careerQuestTriggersDataService.introS1P7(pipClass.selectedPip.pipUUID)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to upload code to Pip at this time",
			description: "Please reload the page and try again"
		})
	}
}
