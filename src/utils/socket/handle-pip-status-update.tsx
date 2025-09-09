"use client"

import { PipStatusUpdate } from "@bluedotrobots/common-ts/types/pip"
import getPipClass from "../../classes/pip-class"
import getToastClass from "../../classes/toast-class"
import getWorkbenchClass from "../../classes/workbench-class"
import requestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"

export default function handlePipStatusUpdate(data: PipStatusUpdate): void {
	const previousPipConnectionStatus = getPipClass().getPipConnectionStatus(data.pipUUID)
	getPipClass().updatePipConnectionStatus(data)
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
				title = `Disconnected from ${getPipClass().findPipNameFromUUID(data.pipUUID)}`
			} else {
				title = `${getPipClass().findPipNameFromUUID(data.pipUUID)} is online. Ready to connect?`
			}

			getWorkbenchClass().setBatteryDataItem({
				key: "isCharging",
				value: false
			})
			return getToastClass().positive({
				title,
				action: actionElement
			})
		case "offline": {
			if (!getPipClass().pipPluggedInSerial) {
				getWorkbenchClass().setBatteryDataNull()
				return getToastClass().neutral({
					title: `${getPipClass().findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
				})
			}
			break
		}
		case "connected":
			return getToastClass().superPositive({
				title: `Connected to ${getPipClass().findPipNameFromUUID(data.pipUUID)}`,
				description: "Happy building!"
			})
	}
}
