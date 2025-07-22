/* eslint-disable no-case-declarations */
"use client"

import { PipStatusUpdate } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import requestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"
import workbenchClass from "../../classes/workbench-class"

export default function handlePipStatusUpdate(data: PipStatusUpdate): void {
	const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
	pipClass.updatePipConnectionStatus(data)
	const { newConnectionStatus } = data
	switch (newConnectionStatus) {
	case "online":
		const actionElement = (
			<BlackWhiteTactileButton onClick={() => requestToConnectToPip(data.pipUUID)}>
				{previousPipConnectionStatus === "connected" ? "Reconnect" : "Connect"}
			</BlackWhiteTactileButton>
		)

		let title: string = ""
		if (previousPipConnectionStatus === "connected") {
			title = `Disconnected from ${pipClass.findPipNameFromUUID(data.pipUUID)}`
		} else {
			title = `${pipClass.findPipNameFromUUID(data.pipUUID)} is online. Ready to connect?`
		}

		return toastClass.positive({
			title,
			action: actionElement
		})
	case "offline":
		workbenchClass.setBatteryDataNull()
		return toastClass.neutral({
			title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
		})
	case "connected":
		return toastClass.superPositive({
			title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
			description: "Happy building!"
		})
	}
}
