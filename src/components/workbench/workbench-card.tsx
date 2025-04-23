"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useEffect, useMemo, useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import VolumeContent from "./volume/volume-content"
import BatteryContent from "./battery/battery-content"
import NetworkContent from "./network/network-content"
import { useWorkbenchContext } from "../../contexts/workbench-context"

function WorkbenchCard() {
	const workbenchClass = useWorkbenchContext()
	const [position, setPosition] = useState({ top: 0, left: 0 })

	// Calculate position when an icon is hovered
	useEffect(() => {
		if (workbenchClass.workbenchItemToShow) {
			// Get the position of the respective icon
			const batteryIcon = document.getElementById("battery-icon")
			if (!batteryIcon) return
			const rect = batteryIcon.getBoundingClientRect()
			setPosition({ top: rect.bottom, left: rect.left })
		}
	}, [workbenchClass.workbenchItemToShow])

	const widthToSet = useMemo(() => {
		return workbenchClass.fixedWidth - 25
	}, [workbenchClass.fixedWidth])

	if (isNull(workbenchClass.workbenchItemToShow)) return null

	return (
		<div
			className={cn(
				"fixed p-4 min-h-40 border-2 border-swan rounded-2xl text-eel text-base",
				"bg-standardBackground z-50",
				// `w-[${widthToSet}px]`,
				workbenchClass.workbenchItemToShow === "battery" ? "rounded-tl-none" : "",
				workbenchClass.workbenchItemToShow === "network" ? "rounded-tr-none" : "",
			)}
			style={{
				width: `${widthToSet}px`, // Set width dynamically here
				top: `${position.top}px`,
				left: `${position.left}px`,
			}}
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
