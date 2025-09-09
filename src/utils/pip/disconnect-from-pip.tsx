"use client"

import isEqual from "lodash-es/isEqual"
import { PipData } from "@bluedotrobots/common-ts/types/pip"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function disconnectFromPip(
	pipData: PipData
) : Promise<void> {
	try {
		const foundPip = getPipClass().findPipFromUUID(pipData.pipUUID)
		if (foundPip?.pipConnectionStatus !== "connected") {
			return getToastClass().neutral({
				title: "Unable to disconnect from Pip",
				description: "Looks like you're not currently connected to this Pip. Please reload the page and try again"
			})
		}

		const connectToPipResponse = await getBlueDotApiClientClass().pipDataService.disconnectFromPip(pipData.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Disconnect from Pip failed")
		}
		getPipClass().updatePipConnectionStatus({ pipUUID: pipData.pipUUID, newConnectionStatus: "online" })
		getPipClass().setSelectedPipToFirstPip()
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: `Unable to disconnect from ${pipData.pipName} at this time`,
			description: "Please reload the page and try again"
		})
	}
}
