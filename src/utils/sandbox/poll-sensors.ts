"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function usePollSensors() : Promise<void> {
	try {
		if (serialConnectionManagerClass.connected) {
			const buffer = MessageBuilder.createStartSensorPollingMessage()

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			isNull(blueDotApiClientClass.httpClient.accessToken) ||
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		const sensorPollingResponse = await blueDotApiClientClass.sandboxDataService.pollSensors(pipClass.selectedPip.pipUUID)
		if (!isEqual(sensorPollingResponse.status, 200) || isNonSuccessResponse(sensorPollingResponse.data)) {
			throw Error ("Unable to poll sensors")
		}
	} catch (error) {
		console.error(error)
	}
}
