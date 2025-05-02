"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../contexts/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useGarageContext } from "../../contexts/garage-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { LightAnimation, lightToLEDType, MessageBuilder } from "@bluedotrobots/common-ts"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"

export default function useLightsAnimation(): (newAnimation: LightAnimation) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const garageClass = useGarageContext()
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
				isNull(blueDotApiClient.httpClient.accessToken) ||
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			garageClass.setSelectedAnimation(newAnimation)

			const newLightsAnimationResponse = await blueDotApiClient.garageDataService.lightsAnimation(
				newAnimation, pipClass.selectedPip.pipUUID
			)
			if (!isEqual(newLightsAnimationResponse.status, 200) || isNonSuccessResponse(newLightsAnimationResponse.data)) {
				throw Error ("Unable to retrieve lab activity tracking data")
			}
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.garageDataService, blueDotApiClient.httpClient.accessToken, garageClass, pipClass.selectedPip, serialManager])

}
