"use client"
import { useMemo, useState } from "react"
import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import workbenchClass from "../../classes/workbench-class"
import WorkbenchIconTemplate from "./workbench-icon-template"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../shadcn/ui/hover-card"

function BatteryWorkbench() {
	const [isOpen, setIsOpen] = useState(false)

	// Determine color class based on battery state
	const getColorClass = useMemo(() => {
		if (!workbenchClass.batteryData) return "opacity-50 text-cardinal"
		if (workbenchClass.batteryData.isCharging) return "text-chargingGreen"
		if (workbenchClass.batteryData.stateOfCharge <= 20) return "text-cardinal"
		else if (workbenchClass.batteryData.stateOfCharge <= 40) return "text-bee"
		else if (workbenchClass.batteryData.stateOfCharge <= 70) return "text-fox"
		return "text-macaw"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.batteryData?.isCharging, workbenchClass.batteryData?.stateOfCharge])

	const getTimeText = useMemo(() => {
		if (!workbenchClass.batteryData) return ""
		if (workbenchClass.batteryData.isCharging) {
			return `Estimated time to full charge: ${workbenchClass.batteryData?.estimatedTimeToFull} minutes`
		}
		return ""
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.batteryData?.isCharging])

	function BatteryWorkbenchToShow() {
		const baseClasses = "!h-14 !w-14"
		const strokeWidth = 2.5
		if (workbenchClass.batteryData?.isCharging) {
			return <BatteryCharging className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		if (!workbenchClass.batteryData?.stateOfCharge) {
			return <BatteryFull className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		if (workbenchClass.batteryData?.stateOfCharge <= 20) {
			return <BatteryWarning className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.batteryData?.stateOfCharge <= 40) {
			return <BatteryLow className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.batteryData?.stateOfCharge <= 70) {
			return <BatteryMedium className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
		}
		return <BatteryFull className={cn(baseClasses, getColorClass)} strokeWidth={strokeWidth}/>
	}

	return (
		<HoverCard openDelay={0} closeDelay={100} onOpenChange={setIsOpen}>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate extraButtonClasses={!isOpen ? "" : "border-swan"}>
						<BatteryWorkbenchToShow />
						<span className={cn("text-base font-medium -mt-2 text-center", getColorClass)}>
							{workbenchClass.batteryData?.stateOfCharge}%
						</span>
					</WorkbenchIconTemplate>
				</div>
			</HoverCardTrigger>

			<HoverCardContent
				className={cn(
					"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
					"bg-standardBackground",
					"duration-0 animate-none",
				)}
				side="bottom"
				align="start"
				sideOffset={5}
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<div className={cn("w-2 h-2 rounded-full", getColorClass.replace("text-", "bg-"))} />
							<span className="font-medium">BATTERY</span>
						</div>
						<span className={cn("font-semibold", getColorClass)}>
							{workbenchClass.batteryData?.stateOfCharge}%
						</span>
					</div>

					<div className="space-y-2">
						{workbenchClass.batteryData?.isCharging && (
							<div className="flex items-center gap-2 text-chargingGreen">
								<span className="text-lg">⚡</span>
								<span className="text-sm font-medium">Charging</span>
							</div>
						)}

						<div className="text-sm text-eel/70">
							{getTimeText}
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default observer(BatteryWorkbench)
