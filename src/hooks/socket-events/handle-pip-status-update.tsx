"use client"

import { useCallback } from "react"
import pipClass from "../../classes/pip-class"
import useToastOptions from "../../components/toast-options"
import useRequestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"
import { PipStatusUpdate } from "@bluedotrobots/common-ts"

export default function useHandlePipStatusUpdate(): (data: PipStatusUpdate) => void {
	const toast = useToastOptions()
	const requestToConnectToPip = useRequestToConnectToPip()

	return useCallback((data: PipStatusUpdate) =>  {
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

			return toast.positive({
				title,
				action: actionElement
			})
		} else if (newConnectionStatus === "offline") {
			return toast.neutral({
				title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
			})
		} else if (newConnectionStatus === "connected") {
			return toast.superPositive({
				title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
				description: "Happy building!"
			})
		}
	}, [requestToConnectToPip, toast])
}
