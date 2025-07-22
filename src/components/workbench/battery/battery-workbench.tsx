"use client"
import { useMemo, useState } from "react"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import workbenchClass from "../../../classes/workbench-class"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../shadcn/ui/hover-card"
import useGetColorClasses from "../../../hooks/workbench/get-color-classes"
import BatteryWorkbenchIcon from "./battery-workbench-icon"

function BatteryWorkbench() {
	const [isOpen, setIsOpen] = useState(false)
	const colorClasses = useGetColorClasses()
	const getTimeText = useMemo(() => {
		if (!workbenchClass.batteryData) return ""
		if (workbenchClass.batteryData.isCharging) {
			return `Estimated time to full charge: ${workbenchClass.batteryData.estimatedTimeToFull} minutes`
		}
		return ""
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workbenchClass.batteryData?.isCharging])

	return (
		<HoverCard openDelay={0} closeDelay={100} onOpenChange={setIsOpen}>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate extraButtonClasses={!isOpen ? "" : "border-swan"}>
						<BatteryWorkbenchIcon />
						<span className={cn("text-base font-medium -mt-2 text-center", colorClasses)}>
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
							<div className={cn("w-2 h-2 rounded-full", colorClasses.replace("text-", "bg-"))} />
							<span className="font-medium">BATTERY</span>
						</div>
						<span className={cn("font-semibold", colorClasses)}>
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
