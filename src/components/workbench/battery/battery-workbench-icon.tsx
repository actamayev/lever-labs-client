import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryWarning, BatteryLow, BatteryMedium } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import pipClass from "../../../classes/pip-class"
import workbenchClass from "../../../classes/workbench-class"
import useGetColorClasses from "../../../hooks/workbench/get-color-classes"

function BatteryWorkbenchIcon() {
	const colorClasses = useGetColorClasses()
	const baseClasses = "!h-14 !w-14"
	const strokeWidth = 2.5

	if (workbenchClass.batteryData?.isCharging || pipClass.pipPluggedInSerial) {
		return <BatteryCharging className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
	}
	if (!workbenchClass.batteryData?.stateOfCharge) {
		return <BatteryFull className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
	}
	if (workbenchClass.batteryData.stateOfCharge <= 20) {
		return <BatteryWarning className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
	} else if (workbenchClass.batteryData.stateOfCharge <= 40) {
		return <BatteryLow className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
	} else if (workbenchClass.batteryData.stateOfCharge <= 70) {
		return <BatteryMedium className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
	}
	return <BatteryFull className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
}

export default observer(BatteryWorkbenchIcon)
