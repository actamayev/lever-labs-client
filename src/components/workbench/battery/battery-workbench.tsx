"use client"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import BatteryWorkbenchIcon from "./battery-workbench-icon"
import workbenchClass from "../../../classes/workbench-class"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../shadcn/ui/hover-card"
import useGetBatteryColorClasses from "../../../hooks/workbench/use-get-battery-color-classes"

function BatteryWorkbench(): React.ReactNode {
	const batteryColorClasses = useGetBatteryColorClasses()

	const batteryData = workbenchClass.batteryData
	// eslint-disable-next-line complexity
	function GetTimeText(): React.ReactNode	{
		if (!batteryData) return "OFFLINE"
		if (batteryData.isCharging) {
			const timeToFull = batteryData.estimatedTimeToFull
			// Time to full is a float, number of hours (ie 1.23 hours). Need to convert to a string with hours and minutes.
			// If hours is 0, we don't need to show it.
			const hours = Math.floor(timeToFull)
			const minutes = Math.round((timeToFull - hours) * 60)
			return (
				<>
					Estimated time to full charge:{" "}
					<span className="font-semibold">
						{hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}
						{hours > 0 && minutes > 0 ? " " : ""}
						{minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}
					</span>
				</>
			)
		}
		const timeToEmpty = batteryData.estimatedTimeToEmpty
		// Time to empty is a float, number of hours (ie 1.23 hours). Need to convert to a string with hours and minutes.
		// If hours is 0, we don't need to show it.
		const hours = Math.floor(timeToEmpty)
		const minutes = Math.round((timeToEmpty - hours) * 60)
		return (
			<>
				Estimated time to empty:{" "}
				<span className="font-semibold">
					{hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}
					{minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}
				</span>
			</>
		)
	}

	return (
		<HoverCard openDelay={0} closeDelay={100}>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate>
						<BatteryWorkbenchIcon />
						<span className={cn("text-2xl font-medium -mt-2 text-center", batteryColorClasses)}>
							{isNull(workbenchClass.batteryDataLastUpdated) ?
								"\u00A0" :
								`${Math.max(0, Math.min(100, workbenchClass.batteryData?.stateOfCharge || 0))}%`}
						</span>
					</WorkbenchIconTemplate>
				</div>
			</HoverCardTrigger>

			<HoverCardContent
				className={cn(
					"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
					"bg-standardBackground", "duration-0 animate-none",
				)}
				side="bottom"
				align="start"
				sideOffset={20}
			>
				<div className="space-y-3">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<div className={cn("w-2 h-2 rounded-full", batteryColorClasses.replace("text-", "bg-"))} />
							<span className="font-medium">BATTERY</span>
						</div>
						<span className={cn("font-semibold", batteryColorClasses)}>
							{isNull(batteryData) ? "OFFLINE" : `${batteryData.stateOfCharge}%`}
						</span>
					</div>

					<div className="space-y-2">
						{batteryData?.isCharging && (
							<div className="flex items-center gap-2 text-chargingGreen">
								<span className="text-lg">⚡</span>
								<span className="text-sm font-medium">Charging</span>
							</div>
						)}

						{batteryData?.isDischarging && (
							<div className="flex items-center gap-2 text-cardinal">
								<span className="text-lg">⚡</span>
								<span className="text-sm font-medium">Discharging</span>
							</div>
						)}

						<div className="text-sm text-eel/70">
							<GetTimeText />
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default observer(BatteryWorkbench)
