import { observer } from "mobx-react"
import { Bot, PlusCircle } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../../../shadcn/ui/button"
import PipButtonTooltip from "../../../pip-button-tooltip"
import { usePipContext } from "../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../hooks/pip/click-pip-sidebar-button"
import PipStatusTooltip from "../../../shadcn/sidebar/primary/add-pip/pip-status-tooltip"
import useSetSelectedPipToFirstPip from "../../../../hooks/pip/set-default-pip-first-pip"

function LabCodePipStatus() {
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={clickPipSidebarButton}
						className="!flex !h-[54px] !w-[54px] !min-w-[54px] relative items-center justify-center
						group-data-[collapsible=icon]:!h-[54px] group-data-[collapsible=icon]:!w-[54px]
						data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0
						bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-200"
					>
						<Bot className="!h-[35px] !w-[35px] !min-w-[35px] text-black dark:text-white" />
						{pipClass.selectedPip ? (
							<PipStatusTooltip />
						) : (
							<PlusCircle
								className="absolute !h-[20px] !w-[20px] text-black dark:text-white rounded-full"
								style={{ right: "1px", top: "1px" }}
							/>
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<PipButtonTooltip />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(LabCodePipStatus)
