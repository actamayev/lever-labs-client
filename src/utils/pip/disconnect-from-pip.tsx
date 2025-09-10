"use client"

import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function disconnectFromPip(pipData: PipData) : Promise<void> {
	try {
		if (!pipClass.selectedPip) return

		const connectToPipResponse = await blueDotApiClient.pipDataService.disconnectFromPip(pipData.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Disconnect from Pip failed")
		}
		pipClass.deletePip()
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: `Unable to disconnect from ${pipData.pipUUID} at this time`,
			description: "Please reload the page and try again"
		})
	}
}
