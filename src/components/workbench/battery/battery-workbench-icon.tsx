import { observer } from "mobx-react"
import { BatteryCharging, BatteryFull, BatteryWarning, BatteryLow, BatteryMedium } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import getPipClass from "../../../classes/pip-class"
import getWorkbenchClass from "../../../classes/workbench-class"
import useGetBatteryColorClasses from "../../../hooks/workbench/use-get-battery-color-classes"

function BatteryWorkbenchIcon(): React.ReactNode {
	const batteryColorClasses = useGetBatteryColorClasses()
	const baseClasses = "!h-14 !w-14"
	const strokeWidth = 2.5

	if (getWorkbenchClass().batteryData?.isCharging || getPipClass().pipPluggedInSerial) {
		return <BatteryCharging className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	if (!getWorkbenchClass().batteryData?.stateOfCharge) {
		return <BatteryFull className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	if (getWorkbenchClass().batteryData.stateOfCharge <= 20) {
		return <BatteryWarning className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	} else if (getWorkbenchClass().batteryData.stateOfCharge <= 40) {
		return <BatteryLow className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	} else if (getWorkbenchClass().batteryData.stateOfCharge <= 70) {
		return <BatteryMedium className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
	}
	return <BatteryFull className={cn(baseClasses, batteryColorClasses)} strokeWidth={strokeWidth}/>
}

export default observer(BatteryWorkbenchIcon)
