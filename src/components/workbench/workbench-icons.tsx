"use client"
import BatteryWorkbench from "./battery-workbench"
import NetworkWorkbench from "./network/network-workbench"
import VolumeWorkbench from "./volume/volume-workbench"

export default function WorkbenchIcons() {
	return (
		<div className="flex flex-row space-x-4">
			<BatteryWorkbench />
			<VolumeWorkbench />
			<NetworkWorkbench />
		</div>
	)
}
