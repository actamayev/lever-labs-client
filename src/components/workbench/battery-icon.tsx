"use client"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import workbenchClass from "../../classes/workbench-class"
import WorkbenchIconTemplate from "./workbench-icon-template"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../shadcn/ui/hover-card"

function BatteryIcon() {
	// Determine color class based on battery state
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
						extraButtonClasses="hover:border-swan hover:bg-standardBackground/50"
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
					"duration-0 animate-none",
				)}
				side="bottom"
				align="start"
				sideOffset={5}
			>
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<div className={cn("w-2 h-2 rounded-full", getColorClass.replace("text-", "bg-"))} />
						<span className="font-medium">Battery Status</span>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span className="text-sm text-eel/70">Charge Level</span>
							<span className={cn("font-semibold", getColorClass)}>
								{workbenchClass.batteryPercentage}%
							</span>
						</div>

						{workbenchClass.isCharging && (
							<div className="flex items-center gap-2 text-chargingGreen">
								<span className="text-lg">⚡</span>
								<span className="text-sm font-medium">Charging</span>
							</div>
						)}

						<div className="text-sm text-eel/70">
							{getTimeText} <span className="font-medium text-eel">2 hours</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default observer(BatteryIcon)
