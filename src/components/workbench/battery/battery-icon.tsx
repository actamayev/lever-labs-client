"use client"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import workbenchClass from "../../../classes/workbench-class"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../shadcn/ui/hover-card"

function BatteryIcon() {
	// Determine which speaker icon to show based on volume level
	const getColorClass = useMemo(() => {
		if (workbenchClass.isCharging) return "text-chargingGreen"
		if (workbenchClass.batteryPercentage <= 20) return "text-cardinal"
		else if (workbenchClass.batteryPercentage <= 40) return "text-bee"
		else if (workbenchClass.batteryPercentage <= 70) return "text-fox"
		return "text-macaw"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.isCharging, workbenchClass.batteryPercentage])

	const getTimeText = useMemo(() => {
		if (workbenchClass.isCharging) return "Estimated time to full charge:"
		return "Estimated time remaining:"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.isCharging])

	function BatteryIconToShow() {
		const baseClasses = "!h-14 !w-14"
		const strokeWidth = 2.5
		if (workbenchClass.isCharging) {
			return <BatteryCharging className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		if (workbenchClass.batteryPercentage <= 20) {
			return <BatteryWarning className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.batteryPercentage <= 40) {
			return <BatteryLow className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.batteryPercentage <= 70) {
			return <BatteryMedium className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		return <BatteryFull className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
	}

	return (
		<HoverCard openDelay={0} closeDelay={100}>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate
						id="battery-icon"
						onMouseEnter={() => {}} // No longer needed!
						extraButtonClasses="hover:border-swan transition-all duration-200"
					>
						<BatteryIconToShow />
						<span className={cn("text-base font-medium -mt-2 text-center", getColorClass)}>
							{workbenchClass.batteryPercentage}%
						</span>
					</WorkbenchIconTemplate>
				</div>
			</HoverCardTrigger>

			<HoverCardContent
				className={cn(
					"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
					"bg-standardBackground shadow-lg",
					"animate-in fade-in-0 zoom-in-95 duration-200",
					// Duolingo-style rounded corners and playful styling
					"rounded-tl-none" // Connect to trigger
				)}
				side="bottom"
				align="start"
				sideOffset={5}
			>
				<div className="space-y-2">
					<div className="font-medium">Battery Status</div>
					<div className="text-sm">
						{getTimeText} 2 hours
					</div>
					{workbenchClass.isCharging && (
						<div className="text-xs text-chargingGreen font-medium">
							⚡ Charging
						</div>
					)}
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default observer(BatteryIcon)
