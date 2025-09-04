"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function stopCareerTrigger(): Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const buffer = MessageBuilder.createStopCareerQuestTriggerMessage()

			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		const stopScriptResponse = await blueDotApiClientClass.careerQuestDataService.stopCareerTrigger(
			pipClass.selectedPip.pipUUID
		)

		if (!isEqual(stopScriptResponse.status, 200) || isNonSuccessResponse(stopScriptResponse.data)) {
			throw new Error("Stop career trigger failed")
		}
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to stop career trigger on Pip at this time",
			description: "Please reload the page and try again"
		})
	}
}
