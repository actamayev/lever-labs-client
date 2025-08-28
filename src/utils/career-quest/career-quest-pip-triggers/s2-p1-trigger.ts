"use client"

import isNull from "lodash-es/isNull"
import { CareerType, MessageBuilder, ValidTriggerMessageType } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"
import pipClass from "../../../classes/pip-class"
import toastClass from "../../../classes/toast-class"

export default async function triggerCareerMessage(
	careerType: CareerType,
	triggerMessageType: ValidTriggerMessageType<CareerType>
) : Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const triggerMessage = MessageBuilder.createTriggerMessage(careerType, triggerMessageType)

			await serialConnectionManagerClass.sendBinaryMessage(triggerMessage)
			return
		}

		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		await blueDotApiClientClass.careerQuestDataService.careerTrigger(careerType, triggerMessageType, pipClass.selectedPip.pipUUID)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to trigger career message at this time",
			description: "Please reload the page and try again"
		})
	}
}
