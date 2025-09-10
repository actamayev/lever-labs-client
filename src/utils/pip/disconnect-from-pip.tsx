"use client"

import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function disconnectFromPip(pipData: PipData) : Promise<void> {
	try {
		if (!pipClass.selectedPip) return

		pipClass.deletePip()
		const connectToPipResponse = await blueDotApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Disconnect from Pip failed")
		}
	} catch (error) {
		console.error(error)
	}
}
