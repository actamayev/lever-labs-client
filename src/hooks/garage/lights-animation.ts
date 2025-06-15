"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { LightAnimation, lightToLEDType, MessageBuilder } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import garageClass from "../../classes/garage-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function useLightsAnimation(): (newAnimation: LightAnimation) => Promise<void> {
	return useCallback(async (newAnimation: LightAnimation) => {
		try {
			if (garageClass.selectedAnimation === newAnimation) return
			if (serialConnectionManagerClass.connected) {
				const lightType = lightToLEDType[newAnimation]
				const buffer = MessageBuilder.createLightAnimationMessage(lightType)

				garageClass.setSelectedAnimation(newAnimation)
				await serialConnectionManagerClass.sendBinaryMessage(buffer)
				return
			}
			if (
				isNull(blueDotApiClientClass.httpClient.accessToken) ||
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			garageClass.setSelectedAnimation(newAnimation)

			const newLightsAnimationResponse = await blueDotApiClientClass.garageDataService.lightsAnimation(
				newAnimation, pipClass.selectedPip.pipUUID
			)
			if (!isEqual(newLightsAnimationResponse.status, 200) || isNonSuccessResponse(newLightsAnimationResponse.data)) {
				throw Error ("Unable to retrieve lab activity tracking data")
			}
		} catch (error) {
			console.error(error)
		}
	}, [])
}
