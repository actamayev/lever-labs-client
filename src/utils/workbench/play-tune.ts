"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import { tuneToSoundType } from "@bluedotrobots/common-ts/protocol"
import getPipClass from "../../classes/pip-class"
import getWorkbenchClass from "../../classes/workbench-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"

export default async function playTune(): Promise<void> {
	const tuneToPlay = getWorkbenchClass().selectedSound
	const soundType = tuneToSoundType[tuneToPlay]
	const buffer = MessageBuilder.createSoundMessage(soundType)

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): ReturnType<typeof getBlueDotApiClientClass().workbenchDataService.playTune> => {
			if (isNull(getPipClass().selectedPip)) {
				throw new Error("No pip selected")
			}
			return getBlueDotApiClientClass().workbenchDataService.playTune(
				getWorkbenchClass().selectedSound,
				getPipClass().selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to play tune at this time",
		errorDescription: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
	})
}
