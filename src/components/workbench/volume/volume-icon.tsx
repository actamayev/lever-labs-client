"use client"

import { observer } from "mobx-react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { useWorkbenchContext } from "../../../classes/workbench-context"

function VolumeWorkbench() {
	const workbenchClass = useWorkbenchContext()

	const SpeakerIconToShow = () => {
		const baseClasses = "!h-11 !w-11" // Slightly smaller to accommodate text below
		const strokeWidth = 2.5
		if (workbenchClass.isMuted) {
			return <VolumeOff className={cn(baseClasses, "opacity-50")} strokeWidth={strokeWidth}/>
		}

		if (workbenchClass.volume <= 20) {
			return <Volume className={baseClasses} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.volume <= 40) {
			return <Volume1 className={baseClasses} strokeWidth={strokeWidth}/>
		} else {
			return <Volume2 className={baseClasses} strokeWidth={strokeWidth}/>
		}
	}

	return (
		<WorkbenchIconTemplate
			onMouseEnter={() => workbenchClass.setWorkbenchItemToShow("volume")}
			extraButtonClasses={cn(
				workbenchClass.workbenchItemToShow === "volume" && "border-swan relative"
			)}>
			{workbenchClass.workbenchItemToShow === "volume" && (
				<div className="absolute bottom-[-2px] left-[0px] right-[0px] h-[3px] bg-standardBackground z-10"></div>
			)}
			<SpeakerIconToShow />
			<span className={cn("text-base font-medium mt-0 w-full text-center", workbenchClass.isMuted && "opacity-50")}>
				{workbenchClass.volume}%
			</span>
		</WorkbenchIconTemplate>
	)
}

export default observer(VolumeWorkbench)
