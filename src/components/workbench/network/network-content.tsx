"use client"

import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Settings } from "lucide-react"
import { Button } from "../../ui/button"
import pipClass from "../../../classes/pip-class"
import workbenchClass from "../../../classes/workbench-class"
import disconnectFromPip from "../../../utils/pip/disconnect-from-pip"
import requestToConnectToPip from "../../../utils/pip/request-to-connect-to-pip"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

function NetworkContent({ setIsHoverCardOpen }: { setIsHoverCardOpen: (isHoverCardOpen: boolean) => void }): React.ReactNode {
	const selectedPip = pipClass.selectedPip
	if (pipClass.selectedPip?.pipConnectionStatus === "connected to serial to you") {
		return (
			<Button
				onClick={(e): void => {
					e.stopPropagation()
					workbenchClass.setIsWiFiDialogOpen(true)
					setIsHoverCardOpen(false) // Close hover card when opening dialog
				}}
				className="rounded-xl bg-eel h-9 px-3 w-full"
				disabled={!serialConnectionManagerClass.pipTurnedOn}
				title="Wi-Fi Settings"
			>
				<Settings className="h-4 w-4 mr-2" />
				Wi-Fi Settings...
			</Button>
		)
	}
	if (isNull(selectedPip)) {
		return (
			<div className="text-center text-eel/70">
				No device selected
			</div>
		)
	}

	switch (selectedPip.pipConnectionStatus) {
		case "online":
			return (
				<div className="space-y-3">
					<div className="text-base font-medium">
						{selectedPip.pipUUID} is ready to connect
					</div>
					<Button
						onClick={(): void => {
							requestToConnectToPip(selectedPip.pipUUID)
							setIsHoverCardOpen(false)
						}}
						className="rounded-xl bg-eel h-9 w-full"
					>
						CONNECT
					</Button>
				</div>
			)
		case "connected online to another user":
			return null
		case "connected online to you":
			return (
				<Button
					onClick={(): void => {
						disconnectFromPip(selectedPip)
						setIsHoverCardOpen(false)
					}}
					className="rounded-xl bg-eel w-full"
				>
					DISCONNECT
				</Button>
			)
		case "connected to serial to you":
			return (
				<Button
					onClick={(e): void => {
						e.stopPropagation()
						workbenchClass.setIsWiFiDialogOpen(true)
						setIsHoverCardOpen(false) // Close hover card when opening dialog
					}}
					className="rounded-xl bg-eel h-9 px-3 w-full"
					disabled={!serialConnectionManagerClass.pipTurnedOn}
					title="Wi-Fi Settings"
				>
					<Settings className="h-4 w-4 mr-2" />
					Wi-Fi Settings...
				</Button>
			)
		case "connected to serial to another user":
			return null
		default:
			return (
				<div className="text-center text-eel/70">
					Unknown connection status
				</div>
			)
	}
}

export default observer(NetworkContent)
