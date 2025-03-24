import { useState } from "react"
import { observer } from "mobx-react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover"
import VolumePopover from "./volume-popover"
import WorkbenchIconTemplate from "../workbench-icon-template"
import { useWorkbenchContext } from "../../../contexts/workbench-context"

function VolumeWorkbench() {
	const [volume, setVolume] = useState(70)
	const [isMuted, setIsMuted] = useState(false)
	const workbenchClass = useWorkbenchContext()

	const SpeakerIconToShow = () => {
		const baseClasses = "!h-11 !w-11" // Slightly smaller to accommodate text below
		const strokeWidth = 2.5
		if (isMuted) {
			return <VolumeOff className={baseClasses} strokeWidth={strokeWidth}/>
		}

		if (volume <= 20) {
			return <Volume className={baseClasses} strokeWidth={strokeWidth}/>
		} else if (volume <= 40) {
			return <Volume1 className={baseClasses} strokeWidth={strokeWidth}/>
		} else {
			return <Volume2 className={baseClasses} strokeWidth={strokeWidth}/>
		}
	}

	return (
		<Popover openOnHover>
			<PopoverTrigger asChild>
				<WorkbenchIconTemplate
					onMouseEnter={() => workbenchClass.setWorkbenchItemToShow("volume")}
					extraButtonClasses={!isMuted ? "" : "opacity-50"}>
					<SpeakerIconToShow />
					<span className="text-base font-medium mt-0 w-full text-center">
						{volume}%
					</span>
				</WorkbenchIconTemplate>
			</PopoverTrigger>
			<PopoverContent className="w-96">
				<VolumePopover
					volume={volume}
					isMuted={isMuted}
					setIsMuted={setIsMuted}
					setVolume={setVolume}
				/>
			</PopoverContent>
		</Popover>
	)
}

export default observer(VolumeWorkbench)
