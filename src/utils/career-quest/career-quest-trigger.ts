"use client"

import isNull from "lodash-es/isNull"
import { CareerType, MessageBuilder, ValidTriggerMessageType } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"

export default async function careerQuestTrigger(
	careerType: CareerType,
	triggerMessageType: ValidTriggerMessageType<CareerType>
): Promise<void> {
	const buffer = MessageBuilder.createTriggerMessage(careerType, triggerMessageType)

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): ReturnType<typeof blueDotApiClientClass.careerQuestDataService.careerTrigger> => {
			if (isNull(pipClass.selectedPip)) {
				throw new Error("No pip selected")
			}
			return blueDotApiClientClass.careerQuestDataService.careerTrigger(
				careerType, triggerMessageType, pipClass.selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to trigger career message at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
