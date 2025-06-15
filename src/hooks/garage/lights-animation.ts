"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../classes/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import garageClass from "../../classes/garage-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { LightAnimation, lightToLEDType, MessageBuilder } from "@bluedotrobots/common-ts"
import { useSerialManagerContext } from "../../classes/serial-manager-context"

export default function useLightsAnimation(): (newAnimation: LightAnimation) => Promise<void> {
	const pipClass = usePipContext()
	const serialManager = useSerialManagerContext()

	return useCallback(async (newAnimation: LightAnimation) => {
		try {
			if (garageClass.selectedAnimation === newAnimation) return
			if (serialManager.connected) {
				const lightType = lightToLEDType[newAnimation]
				const buffer = MessageBuilder.createLightAnimationMessage(lightType)

				garageClass.setSelectedAnimation(newAnimation)
				await serialManager.sendBinaryMessage(buffer)
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
	}, [pipClass.selectedPip, serialManager])
}
