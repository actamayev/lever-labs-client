"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"

export default async function createDisplayMessage(buffer: Uint8Array): Promise<void> {
	const displayBufferMessage = MessageBuilder.createDisplayBufferMessage(buffer)
	if (isNull(displayBufferMessage)) {
		return getToastClass().negative({
			title: "Unable to create display message",
			description: "Display buffer message is null"
		})
	}

	await sendDataToSerialOrApiTemplate({
		buffer: displayBufferMessage,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = getPipClass().selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return getBlueDotApiClientClass().garageDataService.createDisplayBuffer(
				buffer,
				selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to send display buffer to Pip at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
