"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../contexts/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useGarageContext } from "../../contexts/garage-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useLightsAnimation(): (newAnimation: LightAnimation) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const garageClass = useGarageContext()
	const pipClass = usePipContext()

	return useCallback(async (newAnimation: LightAnimation) => {
		try {
			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				garageClass.selectedAnimation === newAnimation ||
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			garageClass.setSelectedAnimation(newAnimation)

			const newLightsAnimationResponse = await blueDotApiClient.workbenchDataService.lightsAnimation(
				newAnimation, pipClass.selectedPip.pipUUID
			)
			if (!isEqual(newLightsAnimationResponse.status, 200) || isNonSuccessResponse(newLightsAnimationResponse.data)) {
				throw Error ("Unable to retrieve lab activity tracking data")
			}
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.workbenchDataService, garageClass, pipClass.selectedPip])

}
