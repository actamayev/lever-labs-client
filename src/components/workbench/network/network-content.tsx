import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Settings } from "lucide-react"
import { Button } from "../../shadcn/ui/button"
import pipClass from "../../../classes/pip-class"
import workbenchClass from "../../../classes/workbench-class"
import disconnectFromPip from "../../../utils/pip/disconnect-from-pip"
import requestToConnectToPip from "../../../utils/pip/request-to-connect-to-pip"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

// eslint-disable-next-line max-lines-per-function
function NetworkContent({ setIsHoverCardOpen }: { setIsHoverCardOpen: (isHoverCardOpen: boolean) => void }): React.ReactNode {
	const selectedPip = pipClass.selectedPip
	if (pipClass.pipPluggedInSerial) {
		return (
			<Button
				onClick={(e) => {
					e.stopPropagation()
					workbenchClass.setIsWiFiDialogOpen(true)
					setIsHoverCardOpen(false) // Close hover card when opening dialog
				}}
				className="rounded-xl bg-eel h-9 px-3 w-full"
				disabled={!serialConnectionManagerClass.pipTurnedOn}
				title="WiFi Settings"
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
		case "offline":
			return (
				<div className="space-y-3">
					<div className="text-base font-medium">
						Please connect {selectedPip.pipName} to the internet
					</div>
					<Button
						onClick={(e) => {
							e.stopPropagation()
							workbenchClass.setIsWiFiDialogOpen(true)
							setIsHoverCardOpen(false) // Close hover card when opening dialog
						}}
						className="rounded-xl bg-eel h-9 px-3 w-full"
						disabled={!serialConnectionManagerClass.pipTurnedOn}
						title="WiFi Settings"
					>
						<Settings className="h-4 w-4 mr-2" />
						Wi-Fi Settings...
					</Button>
				</div>
			)
		case "online":
			return (
				<div className="space-y-3">
					<div className="text-base font-medium">
						{selectedPip.pipName} is ready to connect
					</div>
					<Button
						onClick={() => {
							requestToConnectToPip(selectedPip.pipUUID)
							setIsHoverCardOpen(false)
						}}
						className="rounded-xl bg-eel h-9 w-full"
					>
						CONNECT
					</Button>
				</div>
			)
		case "connected to other user":
			return null
		case "connected":
			return (
				<div className="space-y-3">
					<div className="text-base font-medium text-green-500">
						Connected to {selectedPip.pipName}
					</div>
					<Button
						onClick={() => {
							disconnectFromPip(selectedPip)
							setIsHoverCardOpen(false)
						}}
						className="rounded-xl bg-eel w-full"
					>
						DISCONNECT
					</Button>
				</div>
			)
		case "connected to serial":
			return (
				<Button
					onClick={(e) => {
						e.stopPropagation()
						workbenchClass.setIsWiFiDialogOpen(true)
						setIsHoverCardOpen(false) // Close hover card when opening dialog
					}}
					className="rounded-xl bg-eel h-9 px-3 w-full"
					disabled={!serialConnectionManagerClass.pipTurnedOn}
					title="WiFi Settings"
				>
					<Settings className="h-4 w-4 mr-2" />
					Wi-Fi Settings...
				</Button>
			)
		default:
			return (
				<div className="text-center text-eel/70">
					Unknown connection status
				</div>
			)
	}
}

export default observer(NetworkContent)
