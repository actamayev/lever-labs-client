"use client"

import BatteryWorkbench from "./battery-workbench"
import NetworkWorkbench from "./network-workbench"
import VolumeWorkbench from "./volume/volume-workbench"

export default function WorkbenchLayout() {
	return (
		<>
			<BatteryWorkbench />
			<VolumeWorkbench />
			<NetworkWorkbench />
		</>
	)
}
