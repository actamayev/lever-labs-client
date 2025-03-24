"use client"
import WorkbenchCard from "./workbench-card"
import VolumeWorkbench from "./volume/volume-workbench"
import BatteryWorkbench from "./battery/battery-workbench"
import NetworkWorkbench from "./network/network-workbench"

export default function WorkbenchIcons() {
	return (
		<>
			<div className="flex flex-row space-x-4">
				<BatteryWorkbench />
				<VolumeWorkbench />
				<NetworkWorkbench />
			</div>
			<WorkbenchCard />
		</>
	)
}
