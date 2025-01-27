import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Bot, PlusCircle } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import PipStatusTooltip from "./pip-status-tooltip"
import { usePipContext } from "../../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../../hooks/pip/click-pip-sidebar-button"
import useSetSelectedPipToFirstPip from "../../../../../hooks/pip/set-default-pip-first-pip"

function AddPipSidebarButton() {
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	const tooltipContent = () => {
		if (isNull(pipClass.selectedPip)) {
			return <>Add Pip</>
		} else if (pipClass.selectedPip.pipConnectionStatus === "connected") {
			return <>Disconnect from {pipClass.selectedPip.pipName}</>
		}
		return <>Connect to {pipClass.selectedPip.pipName}</>
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<SidebarMenuButton
					tooltip={{
						children: tooltipContent(),
						hidden: false
					}}
					onClick={clickPipSidebarButton}
					className="!flex !h-[54px] !w-[54px] !min-w-[54px] relative items-center justify-center
					group-data-[collapsible=icon]:!h-[54px] group-data-[collapsible=icon]:!w-[54px]
					data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0"
					isActive={location.pathname === "/add-pip"}
				>
					<Bot className="!h-[35px] !w-[35px] !min-w-[35px]" />
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
