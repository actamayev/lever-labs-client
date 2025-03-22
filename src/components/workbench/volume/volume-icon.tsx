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
	const SpeakerIconToShow = () => {
		const baseClasses = "!h-10 !w-10" // Slightly smaller to accommodate text below
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
							className="!px-5 py-2 hover:bg-polar flex flex-col items-center
  							justify-center h-auto hover:text-current rounded-2xl w-20"
							onClick={toggleMute}
						>
							<div className="flex flex-col items-center">
								<SpeakerIconToShow />
								<span className="text-base font-medium mt-0 w-full text-center">
									{volume}%
								</span>
							</div>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top" className="text-standardBackground">
						{isMuted ? "UNMUTE" : "MUTE"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
