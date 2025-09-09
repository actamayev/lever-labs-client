"use client"

import isNull from "lodash-es/isNull"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import sendDataToSerialOrApiTemplate from "../send-data-to-serial-or-api-template"

export default async function stopPollingSensors(): Promise<void> {
	const buffer = MessageBuilder.createStopSensorPollingMessage()

	await sendDataToSerialOrApiTemplate({
		buffer,
		dataServiceEndpoint: (): ReturnType<typeof getBlueDotApiClientClass().pipDataService.stopSensorPolling> => {
			if (isNull(getPipClass().selectedPip)) {
				throw new Error("No pip selected")
			}
			return getBlueDotApiClientClass().pipDataService.stopSensorPolling(
				getPipClass().selectedPip.pipUUID
			)
		},
		errorTitle: "Unable to stop sensor polling on Pip at this time",
		skipOfflineCheck: true,
		failSilently: true
	})
}
