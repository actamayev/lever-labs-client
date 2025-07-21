"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import { Wifi, WifiOff, Settings } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import pipClass from "../../classes/pip-class"
import workbenchClass from "../../classes/workbench-class"
import WorkbenchIconTemplate from "./workbench-icon-template"
import disconnectFromPip from "../../utils/pip/disconnect-from-pip"
import WifiSettingsDialog from "./network-dialog/wifi-settings-dialog"
import requestToConnectToPip from "../../utils/pip/request-to-connect-to-pip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../shadcn/ui/hover-card"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

// eslint-disable-next-line max-lines-per-function
function NetworkWorkbench() {
	const [isHoverCardOpen, setIsHoverCardOpen] = useState(false)

	const WifiIconToShow = observer(() => {
		const baseClasses = "!h-12 !w-12"
		const strokeWidth = 2.5
		if (isNull(pipClass.selectedPip)) return null
		else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return (
				<div className="flex items-center justify-center flex-col text-cardinal opacity-50">
					<WifiOff
						className={cn(baseClasses)}
						strokeWidth={strokeWidth}
					/>
					<span className="text-sm ">OFFLINE</span>
				</div>
			)
		}
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "online":
			return (
				<div className="flex items-center justify-center flex-col text-macaw">
					<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED</span>
				</div>
			)
		case "connected to other user":
			return (
				<div className="flex items-center justify-center flex-col text-beetle">
					<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED TO</span>
					<span className="text-sm">ANOTHER USER</span>
				</div>
			)
		case "connected":
			return (
				<div className="flex items-center justify-center flex-col text-green-500">
					<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">CONNECTED</span>
				</div>
			)
		default:
			return (
				<div className="flex items-center justify-center flex-col text-wolf">
					<Wifi className={cn(baseClasses)} strokeWidth={strokeWidth}/>
					<span className="text-sm">UNKNOWN STATUS</span>
				</div>
			)
		}
	})

	const getStatusText = () => {
		if (isNull(pipClass.selectedPip)) return "No device selected"

		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "offline":
			return "Offline"
		case "online":
			return "Online"
		case "connected to other user":
			return "Connected to other user"
		case "connected":
			return "Connected"
		default:
			return "Unknown status"
		}
	}

	const getStatusColor = () => {
		if (isNull(pipClass.selectedPip)) return "text-wolf"

		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "offline":
			return "text-cardinal"
		case "online":
			return "text-macaw"
		case "connected to other user":
			return "text-beetle"
		case "connected":
			return "text-green-500"
		default:
			return "text-wolf"
		}
	}

	const renderNetworkContent = () => {
		const selectedPip = pipClass.selectedPip
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
			return (
				<div className="text-center">
					<div className="text-base font-medium text-beetle">
						{selectedPip.pipName} is connected to another user
					</div>
				</div>
			)
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
		default:
			return (
				<div className="text-center text-eel/70">
					Unknown connection status
				</div>
			)
		}
	}

	return (
		<>
			<HoverCard
				open={isHoverCardOpen}
				onOpenChange={setIsHoverCardOpen}
				openDelay={0}
				closeDelay={100}
			>
				<HoverCardTrigger asChild>
					<div>
						<WorkbenchIconTemplate extraButtonClasses={!isHoverCardOpen ? "" : "border-swan"}>
							<WifiIconToShow />
						</WorkbenchIconTemplate>
					</div>
				</HoverCardTrigger>

				<HoverCardContent
					className={cn(
						"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
						"bg-standardBackground",
						"duration-0 z-30",
					)}
					side="bottom"
					align="end"
					sideOffset={5}
				>
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<div className={cn(
								"w-2 h-2 rounded-full",
								getStatusColor().replace("text-", "bg-")
							)} />
							<span className="font-medium">NETWORK</span>
						</div>

						<div className="flex justify-between items-center">
							<span className="text-sm text-eel/70">Status</span>
							<span className={cn("font-semibold text-sm", getStatusColor())}>
								{getStatusText()}
							</span>
						</div>

						<div className="pt-2">
							{renderNetworkContent()}
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>

			<WifiSettingsDialog />
		</>
	)
}

export default observer(NetworkWorkbench)
