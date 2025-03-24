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
import { buttonVariants } from "../../shadcn/ui/button"

function NetworkIcon() {
	const pipClass = usePipContext()

	const WifiIconToShow = observer(() => {
		const baseClasses = "!h-12 !w-12" // Slightly smaller to accommodate text below
		const strokeWidth = 2.5
		if (isNull(pipClass.selectedPip)) return null
		else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return (
				<WifiOff
					className={cn(baseClasses, "text-cardinal")}
					strokeWidth={strokeWidth}
				/>
			)
		}
		let colorClasses = ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "online":
			colorClasses = "text-macaw"
			break
		case "connected to other user":
			colorClasses = "text-beetle"
			break
		case "connected":
			colorClasses = "text-green-500"
			break
		default:
			colorClasses = "text-wolf"
		}
		return (
			<Wifi className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
		)
	})

	return (
		<div className={cn(
			"flex flex-col items-center justify-center ml-0.5 cursor-default",
			pipClass.selectedPip?.pipConnectionStatus === "offline" ? "text-eel/50" : "text-eel"
		)}>
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<div
							className={cn(
								buttonVariants({
									variant: "ghost",
									size: "lg",
									className: "hover:bg-polar flex flex-col items-center cursor-default \
									justify-center h-auto hover:text-current rounded-2xl p-0 outline-none"
								})
							)}
						>
							<div className="flex flex-col items-center justify-center size-20">
								<WifiIconToShow />
							</div>
						</div>
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
