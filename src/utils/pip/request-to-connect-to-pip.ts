/* eslint-disable max-depth */
"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default async function requestToConnectToPip(pipUUID: PipUUID): Promise<void> {
	try {
		if (pipClass.selectedPip?.pipUUID === pipUUID) return
		const connectToPipResponse = await leverLabsApiClient.pipDataService.requestToConnectToPip(pipUUID)

		if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
			throw new Error("Connect to Pip failed")
		}
		pipClass.addNewPip({ pipUUID, pipConnectionStatus: "connected online to you" })
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			if (isMessageResponse(error.response?.data)) {
				if (error.response?.data.message === "Unable to connect to Pip, serial connection is active") {
					pipClass.setSearchResult({
						pipUUID,
						pipName: "Pip",
						pipConnectionStatus: "connected to serial to another user"
					})
					return
				} else if (error.response?.data.message === "This Pip is not active/connected to the internet") {
					return toastClass.negative({
						title: "Unable to connect",
						description: `${pipUUID} is not connected to the internet`
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
			title: `Unable to connect to ${pipUUID} at this time`,
			description: "Please reload the page and try again"
		})
	}
}
