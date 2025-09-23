"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import pipClass from "../../classes/pip-class"

export default async function pipTurningOffSerialDisconnection(): Promise<void> {
	try {
		const pipUUID = pipClass.selectedPip?.pipUUID
		console.log("pipUUID", pipUUID)
		if (!pipUUID) return

		const response = await blueDotApiClient.pipDataService.pipTurningOff(pipUUID)

		if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
			throw new Error("Pip turning off serial connection failed")
		}

		pipClass.deletePip()
	} catch (error) {
		console.error("Error attempting pip auto connect:", error)
	}
}
