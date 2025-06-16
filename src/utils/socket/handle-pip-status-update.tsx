"use client"

import { PipStatusUpdate } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import requestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"

export default function handlePipStatusUpdate(data: PipStatusUpdate) : void {
	const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
	pipClass.updatePipConnectionStatus(data)
	const { newConnectionStatus } = data
	if (newConnectionStatus === "online") {
		const actionElement = (
			<BlackWhiteTactileButton onClick={() => requestToConnectToPip(data.pipUUID)}>
				{previousPipConnectionStatus === "connected" ? "Reconnect" : "Connect"}
			</BlackWhiteTactileButton>
		)

		let title
		if (previousPipConnectionStatus === "connected") {
			title = `Disconnected from ${pipClass.findPipNameFromUUID(data.pipUUID)}`
		} else {
			title = `${pipClass.findPipNameFromUUID(data.pipUUID)} is online. Ready to connect?`
		}

		return toastClass.positive({
			title,
			action: actionElement
		})
	} else if (newConnectionStatus === "offline") {
		return toastClass.neutral({
			title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
		})
	} else if (newConnectionStatus === "connected") {
		return toastClass.superPositive({
			title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
			description: "Happy building!"
		})
	}
}
