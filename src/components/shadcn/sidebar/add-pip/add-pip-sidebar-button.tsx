"use client"

import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import PipStatusTooltip from "./pip-status-tooltip"
import { cn } from "../../../../lib/shadcn/utils"
import CustomSidebarButton from "../custom-sidebar-button"
import { usePipContext } from "../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../hooks/pip/click-pip-sidebar-button"
import useSetSelectedPipToFirstPip from "../../../../hooks/pip/set-default-pip-first-pip"

// Delete the connect to pip section
function AddPipSidebarButton() {
	const pathname = usePathname()
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	const isActive = pathname === "/add-pip"
	// Create a properly positioned icon with indicator
	const iconElement = (
		<div className="relative flex items-center justify-center w-full h-full">
			<Bot className="h-[35px] w-[35px] text-blue-600 dark:text-blue-300" />
			{pipClass.selectedPip ? (
				<div className="absolute" style={{ top: "-6px", right: "-6px" }}>
					<PipStatusTooltip />
				</div>
			) : (
				<PlusCircle
					className="absolute bg-background rounded-full h-[16px] w-[16px]"
					style={{ top: "-2px", right: "-2px" }}
				/>
			)}
		</div>
	)

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={iconElement}
					text={pipClass.selectedPip ? "CONNECT" : "ADD YOUR PIP"}
					isActive={isActive}
					onClick={clickPipSidebarButton}
					customStyles={cn(
						isActive && "!border-selectedSidebarButtonBorder"
					)}
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)
