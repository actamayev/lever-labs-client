import { useMemo } from "react"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { cn } from "../../../../../lib/shadcn/utils"
import { usePipContext } from "../../../../../contexts/pip-context"

function PipStatusTooltip() {
	const pipClass = usePipContext()

	const getStatusColor = useMemo(() => {
		if (isNull(pipClass.selectedPip)) return ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "inactive": return "bg-red-500"
		case "online": return "bg-blue-500"
		case "connected to other user": return "bg-purple-500"
		case "connected": return "bg-green-500"
		default: return "bg-zinc-500"
		}
	}, [pipClass.selectedPip])

	const getStatusMessage = useMemo(() => {
		if (isNull(pipClass.selectedPip)) return ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "inactive": return `Please turn ${pipClass.selectedPip.pipName} on and connect it to the internet`
		case "online": return `${pipClass.selectedPip.pipName} is online and ready to connect`
		case "connected to other user": return `${pipClass.selectedPip.pipName} is connected to another user`
		case "connected": return "Connected"
		default: return "Unknown status"
		}
	}, [pipClass.selectedPip])

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className={cn(
							"absolute !h-[16px] !w-[16px] rounded-full bg-background",
							getStatusColor
						)}
						style={{ right: "2px", top: "3px" }}
					/>
				</TooltipTrigger>
				<TooltipContent side="right" className="text-zinc-100 dark:text-zinc-900">
					{getStatusMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(PipStatusTooltip)
