"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../../../lib/shadcn/utils"
import workbenchClass from "../../../../classes/workbench-class"
import BatteryWorkbenchIcon from "../../../workbench/battery/battery-workbench-icon"
import useGetBatteryColorClasses from "../../../../hooks/workbench/use-get-battery-color-classes"

function SandboxBatterySection(): React.ReactNode {
	const batteryColorClasses = useGetBatteryColorClasses()
	return (
		<div className="flex flex-col items-center justify-center font-medium">
			<BatteryWorkbenchIcon extraClasses="!size-10" />
			<span className={cn("text-base font-medium -mt-2 text-center", batteryColorClasses)}>
				{isNull(workbenchClass.batteryDataLastUpdated) ?
					"\u00A0" :
					`${Math.max(0, Math.min(100, workbenchClass.batteryData?.stateOfCharge || 0))}%`}
			</span>
		</div>
	)
}

export default observer(SandboxBatterySection)
