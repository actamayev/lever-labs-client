"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { usePipContext } from "../../contexts/pip-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function usePollSensors(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const serialManager = useSerialManagerContext()

	return useCallback(async () => {
		try {
			if (serialManager.connected) {
				const buffer = MessageBuilder.createStartSensorPollingMessage()

				await serialManager.sendBinaryMessage(buffer)
				return
			}
			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				isNull(pipClass.selectedPip) ||
				pipClass.selectedPip.pipConnectionStatus === "offline"
			) return

			const sensorPollingResponse = await blueDotApiClient.sandboxDataService.pollSensors(pipClass.selectedPip.pipUUID)
			if (!isEqual(sensorPollingResponse.status, 200) || isNonSuccessResponse(sensorPollingResponse.data)) {
				throw Error ("Unable to poll sensors")
			}
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.sandboxDataService, pipClass.selectedPip, serialManager])

}
