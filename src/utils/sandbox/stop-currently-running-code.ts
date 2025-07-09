"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function stopCurrentlyRunningCode(): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createStopSandboxCodeMessage()

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		const stopScriptResponse = await blueDotApiClientClass.sandboxDataService.stopCurrentlyRunningCode(
			pipClass.selectedPip.pipUUID
		)

		if (!isEqual(stopScriptResponse.status, 200) || isNonSuccessResponse(stopScriptResponse.data)) {
			throw new Error("Stop currently running code failed")
		}
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to stop currently running code on Pip at this time",
			description: "Please reload the page and try again"
		})
	}
}
