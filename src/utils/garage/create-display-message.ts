"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function createDisplayMessage(buffer: Uint8Array): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const displayBufferMessage = MessageBuilder.createDisplayBufferMessage(buffer)
			if (isNull(displayBufferMessage)) {
				throw new Error("Display buffer message is null")
			}

			await serialConnectionManagerClass.sendBinaryMessage(displayBufferMessage)
			return
		}
		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		const displayBufferResponse = await blueDotApiClientClass.garageDataService.createDisplayBuffer(
			buffer,
			pipClass.selectedPip.pipUUID
		)

		if (!isEqual(displayBufferResponse.status, 200) || isNonSuccessResponse(displayBufferResponse.data)) {
			throw new Error("Failed to send display buffer to Pip")
		}
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to send display buffer to Pip at this time",
			description: "Please reload the page and try again"
		})
	}
}
