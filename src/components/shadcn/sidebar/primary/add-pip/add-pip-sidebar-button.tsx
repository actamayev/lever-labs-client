"use client"

import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import PipStatusTooltip from "./pip-status-tooltip"
import { cn } from "../../../../../lib/shadcn/utils"
import PipButtonTooltip from "../../../../pip-button-tooltip"
import { usePipContext } from "../../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../../hooks/pip/click-pip-sidebar-button"
import useSetSelectedPipToFirstPip from "../../../../../hooks/pip/set-default-pip-first-pip"

function AddPipSidebarButton() {
	const pathname = usePathname()
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	const isActive = pathname === "/add-pip"

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<SidebarMenuButton
					tooltip={{
						children: <PipButtonTooltip />,
						hidden: false
					}}
					onClick={clickPipSidebarButton}
					className={cn(
						"!flex !h-[55px] !w-[55px] !min-w-[55px] relative items-center justify-center",
						"group-data-[collapsible=icon]:!h-[55px] group-data-[collapsible=icon]:!w-[55px]",
						"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0",
						// Add a transparent border by default to prevent layout shift when active
						"border-2 border-transparent",
						isActive ? "!bg-selectedSidebarButtonBackground" : "hover:!bg-sidebarButtonHover",
					)}
					isActive={isActive}
				>
					<Bot className="!h-[35px] !w-[35px] !min-w-[35px] text-blue-600 dark:text-blue-300" />
					{pipClass.selectedPip ? (
						<PipStatusTooltip />
					) : (
						<PlusCircle
							className="absolute !h-[16px] !w-[16px] bg-background rounded-full"
							style={{ right: "2px", top: "2px" }}
						/>
					)}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)
