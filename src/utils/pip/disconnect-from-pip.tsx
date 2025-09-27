"use client"

import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import { isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function disconnectFromPip(pipData: PipData) : Promise<void> {
	try {
		if (!pipClass.selectedPip) return

		pipClass.deletePip()
		const connectToPipResponse = await leverLabsApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Disconnect from Pip failed")
		}
	} catch (error) {
		console.error(error)
	}
}
