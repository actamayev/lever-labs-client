"use client"

import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryWarning, BatteryLow, BatteryMedium } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import pipClass from "../../../classes/pip-class"
import workbenchClass from "../../../classes/workbench-class"
import useGetBatteryColorClasses from "../../../hooks/workbench/use-get-battery-color-classes"

interface BatteryWorkbenchIconProps {
	extraClasses?: string
}

function BatteryWorkbenchIcon({ extraClasses }: BatteryWorkbenchIconProps): React.ReactNode {
	const batteryColorClasses = useGetBatteryColorClasses()
	const baseClasses = "h-16! w-16!"
	const strokeWidth = 2.5

	if (workbenchClass.batteryData?.isCharging || pipClass.selectedPip?.pipConnectionStatus === "connected to serial to you") {
		return <BatteryCharging className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
	}
	const batteryData = workbenchClass.batteryData
	if (!batteryData?.stateOfCharge) {
		return <BatteryFull className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
	}
	if (batteryData.stateOfCharge <= 20) {
		return <BatteryWarning className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
	} else if (batteryData.stateOfCharge <= 40) {
		return <BatteryLow className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
	} else if (batteryData.stateOfCharge <= 70) {
		return <BatteryMedium className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
	}
	return <BatteryFull className={cn(baseClasses, batteryColorClasses, extraClasses)} strokeWidth={strokeWidth}/>
}

export default observer(BatteryWorkbenchIcon)
