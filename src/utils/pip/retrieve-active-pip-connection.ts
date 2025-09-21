"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import pipClass from "../../classes/pip-class"
import isNull from "lodash-es/isNull"

export default async function retrieveActivePipConnection(): Promise<void> {
	try {
		const response = await blueDotApiClient.pipDataService.attemptPipAutoConnect()

		if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
			throw new Error("Attempt pip auto connect failed")
		}

		if (isNull(response.data.autoConnectedPipUUID)) return

		pipClass.addNewPip({
			pipUUID: response.data.autoConnectedPipUUID,
			pipConnectionStatus: "connected online to you"
		})
	} catch (error) {
		console.error("Error attempting pip auto connect:", error)
	}
}
