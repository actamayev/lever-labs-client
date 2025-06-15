"use client"
import { Dispatch, SetStateAction } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Settings } from "lucide-react"
import { Button } from "../../shadcn/ui/button"
import pipClass from "../../../classes/pip-class"
import useDisconnectFromPip from "../../../hooks/pip/disconnect-from-pip"
import useRequestToConnectToPip from "../../../hooks/pip/request-to-connect-to-pip"
import serialConnectionManagerClass from "../../../classes/serial-manager-class"

interface Props {
	setIsWiFiSettingsOpen: Dispatch<SetStateAction<boolean>>
}

function NetworkContent(props: Props) {
	const { setIsWiFiSettingsOpen } = props
	const disconnectFromPip = useDisconnectFromPip()
	const requestToConnectToPip = useRequestToConnectToPip()

	const selectedPip = pipClass.selectedPip
	if (isNull(selectedPip)) return null
	switch (selectedPip.pipConnectionStatus) {
	case "offline":
		return (
			<>
				<div className="text-base font-medium">
				Please connect {selectedPip.pipName} to the internet
				</div>
				<div className="flex gap-2 mt-2">
					<Button
						onClick={(e) => {
							e.stopPropagation() // Prevent event bubbling
							setIsWiFiSettingsOpen(true)
						}}
						className="rounded-xl bg-eel h-9 px-3"
						disabled={!serialConnectionManagerClass.connected}
						title="WiFi Settings"
					>
						<Settings className="h-4 w-4" />
					</Button>
				</div>
			</>
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
				onClick={() => disconnectFromPip(selectedPip)}
				className="rounded-xl bg-eel"
			>
				DISCONNECT
			</Button>
		)
	default: return null
	}
}

export default observer(NetworkContent)
