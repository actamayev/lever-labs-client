"use client"

import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"
import isNull from "lodash-es/isNull"
import { Wifi, WifiOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { useWorkbenchContext } from "../../../contexts/workbench-context"

function NetworkIcon() {
	const pipClass = usePipContext()
	const workbenchClass = useWorkbenchContext()

	const WifiIconToShow = observer(() => {
		const baseClasses = "!h-12 !w-12" // Slightly smaller to accommodate text below
		const strokeWidth = 2.5
		if (isNull(pipClass.selectedPip)) return null
		else if (pipClass.selectedPip.pipConnectionStatus === "offline") {
			return (
				<WifiOff
					className={cn(baseClasses, "text-cardinal")}
					strokeWidth={strokeWidth}
				/>
			)
		}
		let colorClasses = ""
		switch (pipClass.selectedPip.pipConnectionStatus) {
		case "online":
			colorClasses = "text-macaw"
			break
		case "connected to other user":
			colorClasses = "text-beetle"
			break
		case "connected":
			colorClasses = "text-green-500"
			break
		default:
			colorClasses = "text-wolf"
		}
		return (
			<Wifi className={cn(baseClasses, colorClasses)} strokeWidth={strokeWidth}/>
		)
	})

	return (
		<div className={cn(
			"flex flex-col items-center justify-center ml-0.5 cursor-default",
			pipClass.selectedPip?.pipConnectionStatus === "offline" ? "text-eel/50" : "text-eel"
		)}>
			<WorkbenchIconTemplate
				onMouseEnter={() => workbenchClass.setWorkbenchItemToShow("network")}
				extraButtonClasses={
					workbenchClass.workbenchItemToShow === "network" ? "border-swan relative" : ""
				}
			>
				{workbenchClass.workbenchItemToShow === "network" && (
					<div className="absolute bottom-[-2px] left-[0px] right-[0px] h-[3px] bg-standardBackground z-10"></div>
				)}
				<WifiIconToShow />
			</WorkbenchIconTemplate>
		</div>
	)
}

export default observer(NetworkIcon)
