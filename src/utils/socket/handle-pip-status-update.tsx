"use client"

import { PipConnectionUpdate } from "@bluedotrobots/common-ts/types/socket"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import workbenchClass from "../../classes/workbench-class"

export default function handlePipStatusUpdate(data: PipConnectionUpdate): void {
	pipClass.updatePipConnectionStatus(data)
	const { newConnectionStatus } = data
	switch (newConnectionStatus) {
		case "offline": {
			if (pipClass.selectedPip?.pipConnectionStatus !== "connected to serial to you") {
				workbenchClass.setBatteryDataNull()
				pipClass.deletePip()
				return toastClass.neutral({
					title: "Your Pip has disconnected from the internet"
				})
			}
			break
		}
	}
}
