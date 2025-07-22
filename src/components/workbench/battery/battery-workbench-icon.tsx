import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryWarning, BatteryLow, BatteryMedium } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import pipClass from "../../../classes/pip-class"
import workbenchClass from "../../../classes/workbench-class"
import useGetBatteryColorClasses from "../../../hooks/workbench/get-battery-color-classes"

function BatteryWorkbenchIcon() {
	const batteryColorClasses = useGetBatteryColorClasses()
	const baseClasses = "!h-14 !w-14"
	const strokeWidth = 2.5

	if (workbenchClass.batteryData?.isCharging || pipClass.pipPluggedInSerial) {
		return <BatteryCharging className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	if (!workbenchClass.batteryData?.stateOfCharge) {
		return <BatteryFull className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	if (workbenchClass.batteryData.stateOfCharge <= 20) {
		return <BatteryWarning className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	} else if (workbenchClass.batteryData.stateOfCharge <= 40) {
		return <BatteryLow className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	} else if (workbenchClass.batteryData.stateOfCharge <= 70) {
		return <BatteryMedium className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	return <BatteryFull className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
}

export default observer(BatteryWorkbenchIcon)
