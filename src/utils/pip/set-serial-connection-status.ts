"use client"

import isEqual from "lodash-es/isEqual"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"

export default async function setSerialConnectionStatus(pipUUID: PipUUID, connected: boolean): Promise<void> {
	try {
		const response = await blueDotApiClient.pipDataService.setSerialConnectionStatus(pipUUID, connected)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error(`Set serial connection status failed for pip ${pipUUID}`)
		}

		console.info(`Successfully updated serial connection status for pip ${pipUUID}: ${connected ? "connected" : "disconnected"}`)
	} catch (error) {
		console.error(`Error setting serial connection status for pip ${pipUUID}:`, error)
	}
}
