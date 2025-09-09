"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default async function requestToConnectToPip(
	pipUUID: PipUUID
) : Promise<void> {
	const foundPip = getPipClass().findPipFromUUID(pipUUID)
	try {
		if (!foundPip) return
		switch (foundPip.pipConnectionStatus) {
			case "connected": return
			case "connected to other user": {
				return getToastClass().negative({
					title: "Unable to connect",
					description: "Someone is already connected to this Pip"
				})
			}
			case "offline": {
				return getToastClass().negative({
					title: "Unable to connect",
					description: `Please turn ${foundPip.pipName} on and connect it to the internet`
				})
			}
		}
		const connectToPipResponse = await getBlueDotApiClientClass().pipDataService.requestToConnectToPip(foundPip.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Connect to Pip failed")
		}
		getPipClass().updatePipConnectionStatus({ pipUUID: foundPip.pipUUID, newConnectionStatus: "connected" })
		getPipClass().setSelectedPip(foundPip)
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			if (isMessageResponse(error.response?.data)) {
				// eslint-disable-next-line max-depth
				if (error.response?.data.message === "Someone is already connected to this Pip") {
					return getToastClass().negative({
						title: "Unable to connect",
						description: `Someone is already connected to ${foundPip?.pipName}`
					})
				} else if (error.response?.data.message === "This Pip is not active/connected to the internet") {
					return getToastClass().negative({
						title: "Unable to connect",
						description: `${foundPip?.pipName} is not connected to the internet`
					})
				}  else if (error.response?.data.message === "User hasn't registered this UUID") {
					return getToastClass().negative({
						title: "Unable to connect",
						description: "Please register this Pip ID"
					})
				}
			}
		}
		return getToastClass().negative({
			title: `Unable to connect to ${foundPip?.pipName} at this time`,
			description: "Please reload the page and try again"
		})
	}
}
