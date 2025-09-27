"use client"

/* eslint-disable complexity */
import { isEqual } from "lodash-es"
import { AxiosResponse } from "axios"
import isNull from "lodash-es/isNull"
import { AllCommonResponses } from "@lever-labs/common-ts/types/api"
import pipClass from "../classes/pip-class"
import toastClass from "../classes/toast-class"
import { isNonSuccessResponse } from "./type-checks"
import serialConnectionManagerClass from "../classes/serial-connection-manager-class"

interface SendDataOptions {
	buffer: ArrayBuffer
	dataServiceEndpoint: () => Promise<AxiosResponse<AllCommonResponses>>
	errorTitle: string
	errorDescription?: string
	skipOfflineCheck?: boolean
	failSilently?: boolean
}
// TODO 9/2/25: Continue going through the utils and replacing the code with this
export default async function sendDataToSerialOrApiTemplate(options: SendDataOptions): Promise<void> {
	const {
		buffer,
		dataServiceEndpoint,
		errorTitle,
		errorDescription = "Please reload the page and try again",
		skipOfflineCheck = false,
		failSilently = false
	} = options

	try {
		const selectedPip = pipClass.selectedPip
		if (
			failSilently &&
			(
				isNull(selectedPip) ||
				selectedPip.pipConnectionStatus === "offline"
			) &&
			!serialConnectionManagerClass.pipTurnedOn
		) return

		if (serialConnectionManagerClass.pipTurnedOn) {
			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}

		if (!skipOfflineCheck && (
			isNull(selectedPip) ||
			selectedPip.pipConnectionStatus === "offline"
		)) {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB"
			})
		}

		const response = await dataServiceEndpoint()

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("API call failed")
		}
	}
	catch (error) {
		console.error(error)
		return toastClass.negative({
			title: errorTitle,
			description: errorDescription
		})
	}
}
