"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import { CustomUsb } from "../../icons/custom-usb"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

function ConnectSerialButton() {
	const handleConnect = useCallback(async () => {
		if (serialConnectionManagerClass.connected) return // If already connected, do nothing
		await serialConnectionManagerClass.connectToDevice()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serialConnectionManagerClass.connected])

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start w-full">
				<SidebarMenuButton
					isActive={serialConnectionManagerClass.connected}
					className={cn(
					// Base styles - ensure consistent sizing
						"transition-none !flex items-center justify-start !p-0 !h-[50px] w-full", // Added w-full
						"border-2 border-transparent rounded-xl",
						// Active/hover states
						serialConnectionManagerClass.connected
							? "!bg-blue dark:!bg-blue"
							: "hover:!bg-polar",
						// Size and dimensions - apply consistent sizing regardless of collapsible state
						"group-data-[collapsible=icon]:!h-[50px] group-data-[collapsible=icon]:!w-[170px]",
						// Custom styles passed from parent
						serialConnectionManagerClass.connected && "!border-selectedSidebarButtonBorder cursor-default",
						// customStyles
					)}
					onClick={handleConnect}
				>
					<div className="flex items-center justify-start space-x-4 w-full"> {/* Added w-full */}
						<div className={cn("ml-2.5 flex-shrink-0 w-[35px] h-[35px]")}>
							<div className="relative flex items-center justify-center w-full h-full">
								<CustomUsb
									className={cn(
										"h-[35px] w-[35px]",
										serialConnectionManagerClass.connected ? "text-macaw" : "text-blue-600 dark:text-blue-300"
									)}
								/>
							</div>
						</div>
						<div className={cn(
							"text-base font-medium",
							serialConnectionManagerClass.connected ? "text-macaw" : "text-wolf"
						)}>
							{serialConnectionManagerClass.connected ? "CONNECTED" : "CONNECT"}
						</div>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ConnectSerialButton)
