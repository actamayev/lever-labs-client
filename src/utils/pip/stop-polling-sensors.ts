"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"

export default async function stopPollingSensors(): Promise<void> {
	const buffer = MessageBuilder.createStopSensorPollingMessage()

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): ReturnType<typeof blueDotApiClientClass.pipDataService.stopSensorPolling> => {
			if (isNull(pipClass.selectedPip)) {
				throw new Error("No pip selected")
			}
			return blueDotApiClientClass.pipDataService.stopSensorPolling(
				pipClass.selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to stop sensor polling on Pip at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
