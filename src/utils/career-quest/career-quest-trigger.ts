"use client"

import { isEqual } from "lodash-es"
import isNull from "lodash-es/isNull"
import { CareerType, MessageBuilder, ValidTriggerMessageType } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function careerQuestTrigger(
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

		const response = await blueDotApiClientClass.careerQuestDataService.careerTrigger(
			careerType, triggerMessageType, pipClass.selectedPip.pipUUID
		)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Unable to trigger career message at this time")
		}
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to trigger career message at this time",
			description: "Please reload the page and try again"
		})
	}
}
