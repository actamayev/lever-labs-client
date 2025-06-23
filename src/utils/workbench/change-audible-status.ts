"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../../utils/type-checks"
import workbenchClass from "../../classes/workbench-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function changeAudibleStatus(): Promise<void> {
	try {
		if (
			isNull(pipClass.selectedPip) ||
			(pipClass.selectedPip.pipConnectionStatus === "offline" && !serialConnectionManagerClass.connected)
		) {
			return toastClass.negative({
				title: "Pip not connected",
				description: "Please connect your Pip to the Wi-Fi or via USB to play a tune"
			})
		}
		const playTuneResponse = await blueDotApiClientClass.workbenchDataService.changeAudibleStatus(
			!workbenchClass.isMuted,
			pipClass.selectedPip.pipUUID
		)
		if (!isEqual(playTuneResponse.status, 200) || isErrorResponse(playTuneResponse.data)) {
			throw Error("Unable to change mute status")
		}
		workbenchClass.setIsMuted(!workbenchClass.isMuted)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to change mute status",
			description: "Please reload the page and try again"
		})
	}
}
