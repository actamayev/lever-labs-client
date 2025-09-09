"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"

export default async function createDisplayMessage(buffer: Uint8Array): Promise<void> {
	const displayBufferMessage = MessageBuilder.createDisplayBufferMessage(buffer)
	if (isNull(displayBufferMessage)) {
		return toastClass.negative({
			title: "Unable to create display message",
			description: "Display buffer message is null"
		})
	}

	await sendDataToSerialOrApiTemplate({
		buffer: displayBufferMessage,
		dataServiceEndpoint: (): ReturnType<typeof blueDotApiClientClass.garageDataService.createDisplayBuffer> => {
			if (isNull(pipClass.selectedPip)) {
				throw new Error("No pip selected")
			}
			return blueDotApiClientClass.garageDataService.createDisplayBuffer(
				buffer,
				pipClass.selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to send display buffer to Pip at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
