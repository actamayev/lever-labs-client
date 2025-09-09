"use client"

import isNull from "lodash-es/isNull"
import { CareerType, ValidTriggerMessageType } from "@bluedotrobots/common-ts/protocol"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"
import { AxiosResponse } from "axios"

export default async function careerQuestTrigger(
	careerType: CareerType,
	triggerMessageType: ValidTriggerMessageType<CareerType>
): Promise<void> {
	const buffer = MessageBuilder.createTriggerMessage(careerType, triggerMessageType)

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = getPipClass().selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return getBlueDotApiClientClass().careerQuestDataService.careerTrigger(
				careerType, triggerMessageType, selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to trigger career message at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
