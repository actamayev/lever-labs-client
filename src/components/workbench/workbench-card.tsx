import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import VolumeContent from "./volume/volume-content"
import BatteryContent from "./battery/battery-content"
import NetworkContent from "./network/network-content"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function WorkbenchCard() {
	const workbenchClass = useWorkbenchContext()

	if (isNull(workbenchClass.workbenchItemToShow)) return null

	return (
		<div
			className={cn(
				"p-4 min-h-40 border-2 border-swan rounded-2xl text-eel w-full text-base",
				workbenchClass.workbenchItemToShow === "battery" ? "rounded-tl-none" : ""
			)}
			onMouseEnter={() => workbenchClass.setWorkbenchItemHoveringOver(true)}
			onMouseLeave={() => {
				// Don't hide if dropdown is open
				if (workbenchClass.isDropdownOpen) return

				workbenchClass.setWorkbenchItemHoveringOver(false)
				workbenchClass.setWorkbenchItemToShow(null)
			}}
		>
			{workbenchClass.workbenchItemToShow === "battery" && <BatteryContent />}
			{workbenchClass.workbenchItemToShow === "volume" && <VolumeContent />}
			{workbenchClass.workbenchItemToShow === "network" && <NetworkContent />}
		</div>
	)
}

export default observer(WorkbenchCard)
