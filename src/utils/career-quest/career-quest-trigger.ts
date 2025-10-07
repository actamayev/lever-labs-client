"use client"

import isNull from "lodash-es/isNull"
import { CareerType, ValidTriggerMessageType } from "@lever-labs/common-ts/protocol"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AllCommonResponses } from "@lever-labs/common-ts/types/api"
import { AxiosResponse } from "axios"

export default async function careerQuestTrigger(
	careerType: CareerType,
	triggerMessageType: ValidTriggerMessageType<CareerType>
): Promise<void> {
	const buffer = MessageBuilder.createTriggerMessage(careerType, triggerMessageType)

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = pipClass.selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return leverLabsApiClient.careerQuestDataService.careerTrigger(
				careerType, triggerMessageType, selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to trigger career message at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
