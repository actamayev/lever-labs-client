"use client"
import WorkbenchCard from "./workbench-card"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"

export default function WorkbenchIcons() {
	return (
		<>
			<div className="flex flex-row space-x-4">
				<BatteryIcon />
				<VolumeIcon />
				<NetworkIcon />
			</div>
			<WorkbenchCard />
		</>
	)
}
