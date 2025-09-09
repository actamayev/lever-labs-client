"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default async function requestToConnectToPip(
	pipUUID: PipUUID
) : Promise<void> {
	const foundPip = pipClass.findPipFromUUID(pipUUID)
	try {
		if (!foundPip) return
		switch (foundPip.pipConnectionStatus) {
			case "connected": return
			case "connected to other user": {
				return toastClass.negative({
					title: "Unable to connect",
					description: "Someone is already connected to this Pip"
				})
			}
			case "offline": {
				return toastClass.negative({
					title: "Unable to connect",
					description: `Please turn ${foundPip.pipName} on and connect it to the internet`
				})
			}
		}
		const connectToPipResponse = await blueDotApiClient.pipDataService.requestToConnectToPip(foundPip.pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Connect to Pip failed")
		}
		pipClass.updatePipConnectionStatus({ pipUUID: foundPip.pipUUID, newConnectionStatus: "connected" })
		pipClass.setSelectedPip(foundPip)
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			if (isMessageResponse(error.response?.data)) {
				// eslint-disable-next-line max-depth
				if (error.response?.data.message === "Someone is already connected to this Pip") {
					return toastClass.negative({
						title: "Unable to connect",
						description: `Someone is already connected to ${foundPip?.pipName}`
					})
				} else if (error.response?.data.message === "This Pip is not active/connected to the internet") {
					return toastClass.negative({
						title: "Unable to connect",
						description: `${foundPip?.pipName} is not connected to the internet`
					})
				}  else if (error.response?.data.message === "User hasn't registered this UUID") {
					return toastClass.negative({
						title: "Unable to connect",
						description: "Please register this Pip ID"
					})
				}
			}
		}
		return toastClass.negative({
			title: `Unable to connect to ${foundPip?.pipName} at this time`,
			description: "Please reload the page and try again"
		})
	}
}
