"use client"

import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"
import isNull from "lodash-es/isNull"
import toUpper from "lodash-es/toUpper"
import { Wifi, WifiOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../../shadcn/ui/button"

function NetworkIcon() {
	const pipClass = usePipContext()

	const WifiIconToShow = observer(() => {
		const baseClasses = "!h-12 !w-12" // Slightly smaller to accommodate text below
		const strokeWidth = 2.5
		if (isNull(pipClass.selectedPip)) return null
		else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return <WifiOff className={baseClasses} strokeWidth={strokeWidth}/>
		}
		return <Wifi className={baseClasses} strokeWidth={strokeWidth}/>
	})

	return (
		<div className={cn(
			"flex flex-col items-center justify-center ml-0.5 cursor-default",
			pipClass.selectedPip?.pipConnectionStatus === "offline" ? "text-eel/50" : "text-eel"
		)}>
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="lg"
							className="!px-5 py-2 hover:bg-polar flex flex-col items-center
							justify-center h-auto hover:text-current rounded-2xl w-20 cursor-default"
						>
							<div className="flex flex-col items-center">
								<WifiIconToShow />
							</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top" className="text-standardBackground">
						{toUpper(pipClass.selectedPip?.pipConnectionStatus)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}

export default observer(NetworkIcon)
