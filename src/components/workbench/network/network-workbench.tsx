"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import isNull from "lodash-es/isNull"
import { cn } from "../../../lib/shadcn/utils"
import NetworkContent from "./network-content"
import pipClass from "../../../classes/pip-class"
import NetworkIconToShow from "./network-icon-to-show"
import WorkbenchIconTemplate from "../workbench-icon-template"
import WifiSettingsDialog from "./network-dialog/wifi-settings-dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/hover-card"

// eslint-disable-next-line max-lines-per-function
function NetworkWorkbench({ isSandboxPage }: { isSandboxPage?: boolean }): React.ReactNode {
	const [isHoverCardOpen, setIsHoverCardOpen] = useState(false)

	const getStatusText = (): string => {
		if (pipClass.selectedPip?.pipConnectionStatus === "connected to serial to you") return "Connected to USB"
		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip)) return "No device selected"

		switch (selectedPip.pipConnectionStatus) {
			case "offline":
				return "Offline"
			case "online":
				return "Online"
			case "connected online to another user":
				return "Connected to other user"
			case "connected online to you":
				return "Connected"
			case "connected to serial to another user":
				return "Connected to another user via USB"
			case "connected to serial to you":
				return "Connected to you via USB"
			default:
				return "Unknown status"
		}
	}

	const getStatusColor = (): string => {
		if (pipClass.selectedPip?.pipConnectionStatus === "connected to serial to you") return "text-green-500"
		const selectedPip = pipClass.selectedPip
		if (isNull(selectedPip)) return "text-wolf"

		switch (selectedPip.pipConnectionStatus) {
			case "offline":
				return "text-cardinal"
			case "online":
				return "text-macaw"
			case "connected online to another user":
				return "text-beetle"
			case "connected online to you":
				return "text-green-500"
			case "connected to serial to another user":
				return "text-beetle"
			case "connected to serial to you":
				return "text-green-500"
			default:
				return "text-wolf"
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
				<HoverCardTrigger asChild >
					<div>
						<WorkbenchIconTemplate>
							<NetworkIconToShow
								iconClasses={isSandboxPage ? "size-8!" : ""}
								extraTextClasses={isSandboxPage ? "text-base font-medium mt-0" : ""}
							/>
						</WorkbenchIconTemplate>
					</div>
				</HoverCardTrigger>

				<HoverCardContent
					className={cn(
						"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
						"bg-standard-background",
						"duration-0 z-30",
					)}
					side="bottom"
					align="center"
					sideOffset={isSandboxPage ? 5 : 20}
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
							<NetworkContent setIsHoverCardOpen={setIsHoverCardOpen} />
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>

			<WifiSettingsDialog />
		</>
	)
}

export default observer(NetworkWorkbench)
