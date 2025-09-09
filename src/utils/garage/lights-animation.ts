"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { LightAnimation } from "@bluedotrobots/common-ts/types/garage"
import { lightToLEDType } from "@bluedotrobots/common-ts/protocol"
import { MessageBuilder } from "@bluedotrobots/common-ts/message-builder"
import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import garageClass from "../../classes/garage-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function lightsAnimation(newAnimation: LightAnimation): Promise<void> {
	try {
		if (garageClass.selectedAnimation === newAnimation) return
		if (serialConnectionManagerClass.pipTurnedOn) {
			const lightType = lightToLEDType[newAnimation]
			const buffer = MessageBuilder.createLightAnimationMessage(lightType)

			garageClass.setSelectedAnimation(newAnimation)
			await serialConnectionManagerClass.sendBinaryMessage(buffer)
			return
		}
		if (
			authClass.isFinishedWithSignup === false ||
			isNull(pipClass.selectedPip) ||
			pipClass.selectedPip.pipConnectionStatus === "offline"
		) return

		garageClass.setSelectedAnimation(newAnimation)

		const newLightsAnimationResponse = await blueDotApiClientClass.garageDataService.lightsAnimation(
			newAnimation, pipClass.selectedPip.pipUUID
		)
		if (!isEqual(newLightsAnimationResponse.status, 200) || isNonSuccessResponse(newLightsAnimationResponse.data)) {
			throw Error ("Unable to animate lights")
		}
	} catch (error) {
		console.error(error)
	}
}
