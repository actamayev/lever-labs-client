"use client"
import { Dispatch, SetStateAction } from "react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import { cn } from "../../../../lib/shadcn/utils"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
	volume: number
	isMuted: boolean
	setIsMuted: Dispatch<SetStateAction<boolean>>
}

export default function VolumeIcon(props: Props) {
	const { volume, isMuted } = props

	// Determine which speaker icon to show based on volume level
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
		<Button
			type="button"
			variant="ghost"
			size="lg"
			className={cn(
				"!px-5 py-2 hover:bg-polar flex flex-col items-center",
				"justify-center h-auto hover:text-current rounded-2xl w-20",
				!isMuted ? "" : "opacity-50"
			)}
		>
			<div className="flex flex-col items-center">
				<SpeakerIconToShow />
				<span className="text-base font-medium mt-0 w-full text-center">
					{volume}%
				</span>
			</div>
		</Button>
	)
}
