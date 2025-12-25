"use client"

import isNull from "lodash-es/isNull"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { isEqual } from "lodash-es"
import { isNonSuccessResponse } from "../type-checks"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import exportDisplay from "../display/export-display"
import { MessageBuilder } from "@actamayev/lever-labs-common-ts/message-builder"

export default async function createDisplayMessage(pixelBuffer: PixelBuffer): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = exportDisplay(pixelBuffer)
			const displayBufferMessage = MessageBuilder.createDisplayBufferMessage(buffer)
			if (isNull(displayBufferMessage)) {
				return toastClass.negative({
					title: "Unable to create display buffer message",
					description: "Please reload the page and try again"
				})
			}
			await serialConnectionManagerClass.sendBinaryMessage(displayBufferMessage)
			return
		}
		const selectedPip = pipClass.selectedPip

		if (isNull(selectedPip) || selectedPip.pipConnectionStatus === "offline") {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB"
			})
		}
		const buffer = exportDisplay(pixelBuffer)

		const response = await leverLabsApiClient.garageDataService.createDisplayBuffer(
			buffer,
			selectedPip.pipUUID
		)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("API call failed")
		}
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to send display buffer to Pip at this time",
			description: "Please connect your Pip to the Wi-Fi or via USB"
		})
	}
}
