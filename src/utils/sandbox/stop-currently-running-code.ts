"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@actamayev/lever-labs-common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@actamayev/lever-labs-common-ts/types/api"

export default async function stopCurrentlyRunningCode(failSilently: boolean): Promise<void> {
	const buffer = MessageBuilder.createStopSandboxCodeMessage()

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = pipClass.selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return leverLabsApiClient.sandboxDataService.stopCurrentlyRunningCode(
				selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to stop currently running code on Pip at this time",
		skipOfflineCheck: true, // Skip offline check since we want silent failure for this action
		failSilently
	})
}
