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
                        bg-inherit hover:bg-sidebarButtonHover
                        duration-none border-disabledLilypadBackground border-l-2 rounded-none rounded-tr-md rounded-br-md shadow-none"
					>
						<Bot className="!h-12 !w-12 !min-w-12 text-blue-600 dark:text-blue-300" />
						{pipClass.selectedPip ? (
							<PipStatusTooltip />
						) : (
							<PlusCircle
								className="absolute !h-7 !w-7 text-questionText rounded-full"
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
