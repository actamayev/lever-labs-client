"use client"

import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import BatteryWorkbenchIcon from "../../workbench/battery/battery-workbench-icon"
import { cn } from "../../../lib/utils"
import workbenchClass from "../../../classes/workbench-class"

function CQBatterySection(): React.ReactNode {
	return (
		<div className="flex flex-col items-center justify-center font-medium">
			<BatteryWorkbenchIcon extraClasses="h-10! w-10! text-wolf" />
			<span className={cn("text-base font-medium -mt-1 text-center text-wolf")}>
				{isNull(workbenchClass.batteryDataLastUpdated) ?
					"\u00A0" :
					`${Math.max(0, Math.min(100, workbenchClass.batteryData?.stateOfCharge || 0))}%`}
			</span>
		</div>
	)
}

export default observer(CQBatterySection)
