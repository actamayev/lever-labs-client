"use client"

import NetworkWorkbench from "./network-workbench"
import VolumeWorkbench from "./volume/volume-workbench"

export default function WorkbenchLayout() {
	return (
		<>
			<VolumeWorkbench />
			<NetworkWorkbench />
		</>
	)
}
