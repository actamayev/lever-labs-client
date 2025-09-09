"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"

export default async function stopCurrentlyRunningCode(
	failSilently: boolean
): Promise<void> {
	const buffer = MessageBuilder.createStopSandboxCodeMessage()

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = getPipClass().selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return getBlueDotApiClientClass().sandboxDataService.stopCurrentlyRunningCode(
				selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to stop currently running code on Pip at this time",
		skipOfflineCheck: true, // Skip offline check since we want silent failure for this action
		failSilently
	})
}
