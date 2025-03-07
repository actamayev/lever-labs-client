import { observer } from "mobx-react"
import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import PipStatusTooltip from "./pip-status-tooltip"
import { cn } from "../../../../../lib/shadcn/utils"
import PipButtonTooltip from "../../../../pip-button-tooltip"
import { usePipContext } from "../../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../../hooks/pip/click-pip-sidebar-button"
import useSetSelectedPipToFirstPip from "../../../../../hooks/pip/set-default-pip-first-pip"

function AddPipSidebarButton() {
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

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
						location.pathname === "/add-pip"
							? "bg-lightBackgroundHover dark:bg-darkBackgroundHover"
							: "hover:bg-sidebarButtonHoverLight dark:hover:bg-sidebarButtonHoverDark",
					)}
					isActive={location.pathname === "/add-pip"}
				>
					<Bot className="!h-[35px] !w-[35px] !min-w-[35px] text-black dark:text-white" />
					{pipClass.selectedPip ? (
						<PipStatusTooltip />
					) : (
						<PlusCircle
							className="absolute !h-[20px] !w-[20px] bg-background rounded-full"
							style={{ right: "1px", top: "1px" }}
						/>
					)}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)
