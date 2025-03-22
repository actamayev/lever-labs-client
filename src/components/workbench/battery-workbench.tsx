/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client"

import { useMemo } from "react"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import WorkbenchCardTemplate from "./workbench-card-template"

export default function BatteryWorkbench() {
	const batteryPercentage = 70
	const isCharging = false

	// Determine the text color class based on battery status
	const getColorClass = useMemo(() => {
		if (isCharging) return "text-chargingGreen"
		if (batteryPercentage <= 20) return "text-cardinal"
		else if (batteryPercentage <= 40) return "text-bee"
		else if (batteryPercentage <= 70) return "text-fox"
		return "text-macaw"
	}, [isCharging, batteryPercentage])

	function BatteryIconToShow() {
		const baseClasses = "h-14 w-14"
		if (isCharging) {
			return <BatteryCharging className={cn(baseClasses, getColorClass)} />
		}
		if (batteryPercentage <= 20) {
			return <BatteryWarning className={cn(baseClasses, getColorClass)} />
		} else if (batteryPercentage <= 40) {
			return <BatteryLow className={cn(baseClasses, getColorClass)} />
		} else if (batteryPercentage <= 70) {
			return <BatteryMedium className={cn(baseClasses, getColorClass)} />
		}
		return <BatteryFull className={cn(baseClasses, getColorClass)} />
	}

	const getTimeText = useMemo(() => {
		if (isCharging) return "Estimated time to full charge:"
		return "Estimated time remaining:"
	}, [isCharging])

	return (
		<WorkbenchCardTemplate title="Battery">
			<div className="flex items-start">
				<div className="flex flex-col items-center justify-center">
					<BatteryIconToShow />
					<span className={cn("text-base font-medium -mt-2", getColorClass)}>
						{batteryPercentage}%
					</span>
				</div>

				<div className="ml-8 mt-2">
					<p className="text-base text-wolf">{getTimeText}</p>
					<p className="text-lg font-medium">2 hours</p>
				</div>
			</div>
		</WorkbenchCardTemplate>
	)
}
