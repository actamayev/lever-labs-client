"use client"

import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import { useSerialManagerContext } from "../../../contexts/serial-manager-context"
import { CustomUsb } from "../../icons/custom-usb"

function ConnectDisconnectSerialSidebarButton() {
	const serialManager = useSerialManagerContext() // Use the hook to get the serial manager instance

	const handleConnect = async () => {
		await serialManager.connectToDevice()
	}

	const handleDisconnect = async () => {
		await serialManager.disconnect()
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start w-full">
				<SidebarMenuButton
					isActive={serialManager.connected}
					className={cn(
					// Base styles - ensure consistent sizing
						"transition-none !flex items-center justify-start !p-0 !h-[50px] w-full", // Added w-full
						"border-2 border-transparent rounded-xl",
						// Active/hover states
						serialManager.connected
							? "!bg-red-100 dark:!bg-red-900"
							: "hover:!bg-polar",
						// Size and dimensions - apply consistent sizing regardless of collapsible state
						"group-data-[collapsible=icon]:!h-[50px] group-data-[collapsible=icon]:!w-[170px]",
						// Custom styles passed from parent
						serialManager.connected && "!border-cardinal",
						// customStyles
					)}
					onClick={serialManager.connected ? handleDisconnect : handleConnect}
				>
					<div className="flex items-center justify-start space-x-4 w-full"> {/* Added w-full */}
						<div className={cn("ml-2.5 flex-shrink-0 w-[35px] h-[35px]")}>
							<div className="relative flex items-center justify-center w-full h-full">
								<CustomUsb
									className={cn(
										"h-[35px] w-[35px]",
										serialManager.connected ? "text-cardinal" : "text-blue-600 dark:text-blue-300"
									)}
								/>
							</div>
						</div>
						<div className={cn(
							"text-base font-medium",
							serialManager.connected ? "text-cardinal" : "text-wolf"
						)}>
							{serialManager.connected ? "DISCONNECT" : "CONNECT"}
						</div>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ConnectDisconnectSerialSidebarButton)
