"use client"

import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import useRequestToConnectToPip from "../pip/request-to-connect-to-pip"
import { BlackWhiteTactileButton } from "../../components/buttons/tactile-buttons"

export default function useHandlePipStatusUpdate(): (data: PipStatusUpdate) => void {
	const pipClass = usePipContext()
	const toast = useToastOptions()
	const requestToConnectToPip = useRequestToConnectToPip()

	return useCallback((data: PipStatusUpdate) =>  {
		const previousPipConnectionStatus = pipClass.getPipConnectionStatus(data.pipUUID)
		pipClass.updatePipConnectionStatus(data)
		const { newConnectionStatus } = data
		if (newConnectionStatus === "online") {
			const actionElement = (
				<BlackWhiteTactileButton
					shadowHeight={2}
					onClick={() => requestToConnectToPip(data.pipUUID)}
				>
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
		} else if (newConnectionStatus === "inactive") {
			return toast.neutral({
				title: `${pipClass.findPipNameFromUUID(data.pipUUID)} has disconnected from the internet`
			})
		} else if (newConnectionStatus === "connected") {
			return toast.superPositive({
				title: `Connected to ${pipClass.findPipNameFromUUID(data.pipUUID)}`,
				description: "Happy building!"
			})
		}
	}, [pipClass, requestToConnectToPip, toast])
}
