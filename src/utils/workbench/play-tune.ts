"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { tuneToSoundType } from "@bluedotrobots/common-ts/protocol"
import pipClass from "../../classes/pip-class"
import workbenchClass from "../../classes/workbench-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"
import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"

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
			return blueDotApiClient.workbenchDataService.playTune(
				workbenchClass.selectedSound,
				selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to play tune at this time",
		errorDescription: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
	})
}
