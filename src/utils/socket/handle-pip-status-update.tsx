"use client"

import { PipConnectionUpdate } from "@bluedotrobots/common-ts/types/socket"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import workbenchClass from "../../classes/workbench-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function handlePipStatusUpdate(data: PipConnectionUpdate): void {
	console.log("handlePipStatusUpdate", data)
	const { newConnectionStatus, pipUUID } = data

	// If we're getting an "offline" status but we have an active serial connection, ignore it
	if (newConnectionStatus === "offline" &&
        serialConnectionManagerClass.pipTurnedOn &&
        pipClass.selectedPip?.pipUUID === pipUUID) {
		console.log("Ignoring offline status - serial connection is active")
		return
	}

	pipClass.updatePipConnectionStatus(data)

	switch (newConnectionStatus) {
		case "offline": {
			workbenchClass.setBatteryDataNull()
			pipClass.deletePip()
			return toastClass.neutral({
				title: "Your Pip has disconnected from the internet"
			})
		}
	}
}
