"use client"
import { useCallback, Dispatch, SetStateAction } from "react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../../shadcn/ui/button"

interface Props {
	volume: number
	isMuted: boolean
	setIsMuted: Dispatch<SetStateAction<boolean>>
}

export default function VolumeIcon(props: Props) {
	const { volume, isMuted, setIsMuted } = props

	// Toggle mute when speaker icon is clicked
	const toggleMute = useCallback(() => {
		setIsMuted(!isMuted)
	}, [isMuted, setIsMuted])

	// Determine which speaker icon to show based on volume level
	function SpeakerIconToShow() {
		const baseClasses = "!h-12 !w-12"

		if (isMuted) {
			return <VolumeOff className={baseClasses} />
		}

		if (volume <= 20) {
			return <Volume className={baseClasses} />
		} else if (volume <= 40) {
			return <Volume1 className={baseClasses} />
		} else {
			return <Volume2 className={baseClasses} />
		}
	}

	return (
		<div className={cn(
			"flex flex-col items-center justify-center ml-0.5",
			isMuted ? "text-eel/50" : "text-eel"
		)}>
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="lg"
							className="!p-0 hover:bg-polar flex flex-col items-center justify-center"
							onClick={toggleMute}
						>
							<SpeakerIconToShow />
							<span className={cn("text-base font-medium -mt-1")}>
								{isMuted ? "Muted" : `${volume}%`}
							</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top" className="text-standardBackground">
						{isMuted ? "Unmute" : "Mute"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
