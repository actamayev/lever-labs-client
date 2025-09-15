"use client"

import { PipStatusUpdate } from "@bluedotrobots/common-ts/types/pip"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import workbenchClass from "../../classes/workbench-class"

export default function handlePipStatusUpdate(data: PipStatusUpdate): void {
	pipClass.updatePipConnectionStatus(data)
	const { newConnectionStatus } = data
	switch (newConnectionStatus) {
		case "offline": {
			if (!pipClass.pipPluggedInSerial) {
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
