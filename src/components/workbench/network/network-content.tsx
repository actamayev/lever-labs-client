"use client"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Button } from "../../shadcn/ui/button"
import { usePipContext } from "../../../contexts/pip-context"
import useDisconnectFromPip from "../../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../../hooks/pip/request-to-connect-to-pip"

function NetworkContent() {
	const pipClass = usePipContext()
	const diconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()

	const selectedPip = pipClass.selectedPip
	if (isNull(selectedPip)) return null
	switch (selectedPip.pipConnectionStatus) {
	case "offline":
		return (
			<div className="text-base font-medium">
				Please connect {selectedPip.pipName} to the internet
			</div>
		)
	case "online":
		return (
			<Button
				onClick={() => requestToConnectToPip(selectedPip.pipUUID)}
				className="rounded-xl bg-eel h-9"
			>
				CONNECT
			</Button>
		)
	case "connected to other user":
		return null
	case "connected":
		return (
			<Button
				onClick={() => diconnectFromPip(selectedPip)}
				className="rounded-xl bg-eel"
			>
				DISCONNECT
			</Button>
		)
	default: return null
	}
}

export default observer(NetworkContent)
