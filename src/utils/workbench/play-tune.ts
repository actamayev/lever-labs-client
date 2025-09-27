"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@lever-labs/common-ts/message-builder"
import { tuneToSoundType } from "@lever-labs/common-ts/protocol"
import pipClass from "../../classes/pip-class"
import workbenchClass from "../../classes/workbench-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@lever-labs/common-ts/types/api"

export default async function playTune(): Promise<void> {
	const tuneToPlay = workbenchClass.selectedSound
	const soundType = tuneToSoundType[tuneToPlay]
	const buffer = MessageBuilder.createSoundMessage(soundType)

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): Promise<AxiosResponse<AllCommonResponses>>=> {
			const selectedPip = pipClass.selectedPip
			if (isNull(selectedPip)) {
				throw new Error("No pip selected")
			}
			return leverLabsApiClient.workbenchDataService.playTune(
				workbenchClass.selectedSound,
				selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to play tune at this time",
		errorDescription: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
	})
}
