import { observer } from "mobx-react"
import { Bot, PlusCircle } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "@/components/shadcn/ui/button"
import PipButtonTooltip from "../../../pip-button-tooltip"
import { usePipContext } from "../../../../contexts/pip-context"
import useClickPipSidebarButton from "../../../../hooks/pip/click-pip-sidebar-button"
import PipStatusTooltip from "../../../shadcn/sidebar/primary/add-pip/pip-status-tooltip"
import useSetSelectedPipToFirstPip from "../../../../hooks/pip/set-default-pip-first-pip"

// Simplified PipStatus component specifically for the card
function GettingStartedAddPip() {
	const pipClass = usePipContext()
	const clickPipSidebarButton = useClickPipSidebarButton()
	useSetSelectedPipToFirstPip()

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={clickPipSidebarButton}
						className="!flex !h-24 !w-24 !min-w-24 relative items-center justify-center
                        bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800
                        duration-200 border-zinc-200 dark:border-zinc-700 border-l rounded-none rounded-tr-lg rounded-br-lg shadow-none"
					>
						<Bot className="!h-12 !w-12 !min-w-12 text-black dark:text-white" />
						{pipClass.selectedPip ? (
							<PipStatusTooltip />
						) : (
							<PlusCircle
								className="absolute !h-7 !w-7 text-black dark:text-white rounded-full"
								style={{ right: "2px", top: "2px" }}
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

export default observer(GettingStartedAddPip)
