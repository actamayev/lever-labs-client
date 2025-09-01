"use client"

import { PipStatusUpdate } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import workbenchClass from "../../classes/workbench-class"
import requestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"

export default function handlePipStatusUpdate(data: PipStatusUpdate): void {
	const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
	pipClass.updatePipConnectionStatus(data)
	const { newConnectionStatus } = data
	switch (newConnectionStatus) {
		case "online":
			const actionElement = (
				<BlackWhiteTactileButton onClick={async (): Promise<void> => await requestToConnectToPip(data.pipUUID)}>
					{previousPipConnectionStatus === "connected" ? "Reconnect" : "Connect"}
				</BlackWhiteTactileButton>
			)

			let title: string = ""
			if (previousPipConnectionStatus === "connected") {
				title = `Disconnected from ${pipClass.findPipNameFromUUID(data.pipUUID)}`
			} else {
				title = `${pipClass.findPipNameFromUUID(data.pipUUID)} is online. Ready to connect?`
			}

			workbenchClass.setBatteryDataItem({
				key: "isCharging",
				value: false
			})
			return toastClass.positive({
				title,
				action: actionElement
			})
		case "offline": {
			if (!pipClass.pipPluggedInSerial) {
				workbenchClass.setBatteryDataNull()
				return toastClass.neutral({
					title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
				})
			}
			break
		}
		case "connected":
			return toastClass.superPositive({
				title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
				description: "Happy building!"
			})
	}
}
