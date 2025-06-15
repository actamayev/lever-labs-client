"use client"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { useWorkbenchContext } from "../../../classes/workbench-context"

function BatteryIcon() {
	const workbenchClass = useWorkbenchContext()
	// Determine which speaker icon to show based on volume level
	const getColorClass = useMemo(() => {
		if (workbenchClass.isCharging) return "text-chargingGreen"
		if (workbenchClass.batteryPercentage <= 20) return "text-cardinal"
		else if (workbenchClass.batteryPercentage <= 40) return "text-bee"
		else if (workbenchClass.batteryPercentage <= 70) return "text-fox"
		return "text-macaw"
	}, [workbenchClass.isCharging, workbenchClass.batteryPercentage])

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
		<WorkbenchIconTemplate
			id="battery-icon"
			onMouseEnter={() => workbenchClass.setWorkbenchItemToShow("battery")}
			extraButtonClasses={
				workbenchClass.workbenchItemToShow === "battery" ? "border-swan relative" : ""
			}
		>
			{workbenchClass.workbenchItemToShow === "battery" && (
				<div className="absolute bottom-[-2px] left-[0px] right-[0px] h-[3px] bg-standardBackground z-10"></div>
			)}
			<BatteryIconToShow />
			<span className={cn("text-base font-medium -mt-2 text-center", getColorClass)}>
				{workbenchClass.batteryPercentage}%
			</span>
		</WorkbenchIconTemplate>
	)
}

export default observer(BatteryIcon)
