"use client"
import { observer } from "mobx-react"
import WorkbenchCard from "./workbench-card"
import VolumeIcon from "./volume/volume-icon"
import BatteryIcon from "./battery/battery-icon"
import NetworkIcon from "./network/network-icon"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function Workbench() {
	const workbenchClass = useWorkbenchContext()

	return (
		<div
			className="relative"
			onMouseLeave={() => {
				// Only close the card if we're not hovering over it
				if (!workbenchClass.hoveringOverWorkbenchCard) {
					workbenchClass.handleMouseLeave()
				}
			}}
		>
			<div className="flex flex-row space-x-4">
				<BatteryIcon />
				<VolumeIcon />
				<NetworkIcon />
			</div>
			<div className="-mt-0.5">
				<WorkbenchCard />
			</div>
		</div>
	)
}

export default observer(Workbench)
