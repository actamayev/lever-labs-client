"use client"

import { PipConnectionUpdate } from "@actamayev/lever-labs-common-ts/types/socket"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import workbenchClass from "../../classes/workbench-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function handlePipStatusUpdate(data: PipConnectionUpdate): void {
	const { newConnectionStatus, pipUUID } = data

	// If we're getting an "offline" status but we have an active serial connection, ignore it
	if (newConnectionStatus === "offline" &&
        serialConnectionManagerClass.pipTurnedOn &&
        pipClass.selectedPip?.pipUUID === pipUUID) {
		return
	}

	pipClass.updatePipConnectionStatus(data)

	switch (newConnectionStatus) {
		case "offline": {
			workbenchClass.setBatteryDataNull()
			pipClass.deletePip()
			return toastClass.pipDisconnection({
				title: "Your Pip has disconnected from the internet"
			})
		}
		case "connected online to you": {
			// Dismiss any existing disconnect toast when pip reconnects
			toastClass.dismissPipDisconnectionToast()
			break
		}
	}
}
