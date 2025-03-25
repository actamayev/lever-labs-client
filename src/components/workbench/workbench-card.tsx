import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import VolumeContent from "./volume/volume-content"
import BatteryContent from "./battery/battery-content"
import NetworkContent from "./network/network-content"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function WorkbenchCard() {
	const workbenchClass = useWorkbenchContext()

	if (isNull(workbenchClass.workbenchItemToShow)) return null

	return (
		<div
			className="shadow-sm p-4 min-h-24 border-[3px] border-swan rounded-2xl text-eel w-full text-base"
			onMouseEnter={() => workbenchClass.setWorkbenchItemHoveringOver(true)}
			onMouseLeave={() => {
				workbenchClass.setWorkbenchItemHoveringOver(false)
				workbenchClass.handleMouseLeave()
			}}>
			{(workbenchClass.workbenchItemToShow === "battery" && workbenchClass.hoveringOverWorkbenchCard) && (
				<BatteryContent />
			)}
			{(workbenchClass.workbenchItemToShow === "network" && workbenchClass.hoveringOverWorkbenchCard) && (
				<NetworkContent />
			)}
			{(workbenchClass.workbenchItemToShow === "volume" && workbenchClass.hoveringOverWorkbenchCard) && (
				<VolumeContent />
			)}
		</div>
	)
}

export default observer(WorkbenchCard)
