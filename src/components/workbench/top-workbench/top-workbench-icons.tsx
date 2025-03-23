"use client"
import BatteryWorkbench from "./battery-workbench"
import VolumeWorkbench from "./volume/volume-workbench"

export default function TopWorkbenchIcons() {
	return (
		<div className="flex flex-row space-x-4">
			<BatteryWorkbench />
			<VolumeWorkbench />
		</div>
	)
}
