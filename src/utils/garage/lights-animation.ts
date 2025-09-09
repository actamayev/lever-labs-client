"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { LightAnimation } from "@bluedotrobots/common-ts/types/garage"
import { lightToLEDType } from "@bluedotrobots/common-ts/protocol"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import getPipClass from "../../classes/pip-class"
import getAuthClass from "../../classes/auth-class"
import getGarageClass from "../../classes/garage-class"
import { isNonSuccessResponse } from "../type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function lightsAnimation(newAnimation: LightAnimation): Promise<void> {
	try {
		if (getGarageClass().selectedAnimation === newAnimation) return
		if (serialConnectionManagerClass.pipTurnedOn) {
			const lightType = lightToLEDType[newAnimation]
			const buffer = MessageBuilder.createLightAnimationMessage(lightType)

			getGarageClass().setSelectedAnimation(newAnimation)
			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		const selectedPip = getPipClass().selectedPip
		if (
			getAuthClass().isFinishedWithSignup === false ||
			isNull(selectedPip) ||
			selectedPip.pipConnectionStatus === "offline"
		) return

		getGarageClass().setSelectedAnimation(newAnimation)

		const newLightsAnimationResponse = await getBlueDotApiClientClass().garageDataService.lightsAnimation(
			newAnimation, selectedPip.pipUUID
		)
		if (!isEqual(newLightsAnimationResponse.status, 200) || isNonSuccessResponse(newLightsAnimationResponse.data)) {
			throw Error ("Unable to animate lights")
		}
	} catch (error) {
		console.error(error)
	}
}
