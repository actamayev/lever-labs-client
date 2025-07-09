"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function usePollSensors() : Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createStartSensorPollingMessage()

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			authClass.isFinishedWithSignup === false ||
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
