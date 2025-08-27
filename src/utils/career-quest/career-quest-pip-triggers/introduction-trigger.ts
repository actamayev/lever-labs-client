"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"
import pipClass from "../../../classes/pip-class"
import toastClass from "../../../classes/toast-class"
import fireConfetti from "../../../utils/fire-confetti"
import { isNonSuccessResponse } from "../../../utils/type-checks"

export default async function introductionTrigger(rect: DOMRect) : Promise<void> {
	try {
		if (serialConnectionManagerClass.pipTurnedOn) {
			const introS1P7Message = MessageBuilder.createIntroS1P7Message()

			const success = await serialConnectionManagerClass.sendBinaryMessage(introS1P7Message)
			if (success) {
				fireConfetti(
					rect,
					({ particleCount: 300, startVelocity: 30 })
				)
			}
			return
		}

		if (
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		const introS1P7Response = await blueDotApiClientClass.careerQuestTriggersDataService.introS1P7(
			pipClass.selectedPip.pipUUID
		)

		if (!isEqual(introS1P7Response.status, 200) || isNonSuccessResponse(introS1P7Response.data)) {
			throw new Error("Intro S1 P7 failed")
		}

		return fireConfetti(
			rect,
			({ particleCount: 300, startVelocity: 30 })
		)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to upload code to Pip at this time",
			description: "Please reload the page and try again"
		})
	}
}
