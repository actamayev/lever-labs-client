/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client"
import { useMemo } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"

export default function TopWorkbenchIcons() {
	const batteryPercentage = 100
	const isCharging = false
	// Determine which speaker icon to show based on volume level
	const getColorClass = useMemo(() => {
		if (isCharging) return "text-chargingGreen"
		if (batteryPercentage <= 20) return "text-cardinal"
		else if (batteryPercentage <= 40) return "text-bee"
		else if (batteryPercentage <= 70) return "text-fox"
		return "text-macaw"
	}, [isCharging, batteryPercentage])

	function BatteryIconToShow() {
		const baseClasses = "!h-14 !w-14"
		const strokeWidth = 2.5
		if (isCharging) {
			return <BatteryCharging className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		if (batteryPercentage <= 20) {
			return <BatteryWarning className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (batteryPercentage <= 40) {
			return <BatteryLow className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (batteryPercentage <= 70) {
			return <BatteryMedium className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		return <BatteryFull className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
	}

	const getTimeText = useMemo(() => {
		if (isCharging) return "Estimated time to full charge:"
		return "Estimated time remaining:"
	}, [isCharging])

	return (
		<div className="flex flex-col items-start justify-center ml-4">
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="lg"
							className="hover:bg-polar flex flex-col items-center
  							justify-center h-auto hover:text-current rounded-2xl p-0"
						>
							<div className="flex flex-col items-center justify-center w-20 h-20">
								<BatteryIconToShow />
								<span className={cn("text-base font-medium -mt-2 text-center", getColorClass)}>
									{batteryPercentage}%
								</span>
							</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom" className="text-standardBackground">
						{getTimeText} 2 hours
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
