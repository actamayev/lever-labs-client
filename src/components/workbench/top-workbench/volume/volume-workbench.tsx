import { useState } from "react"
import { Popover, PopoverTrigger } from "@/components/shadcn/ui/popover"
import VolumeIcon from "./volume-icon"
import VolumePopover from "./volume-popover"

export default function NewVolumeWorkbench() {
	const [volume, setVolume] = useState(70)
	const [isMuted, setIsMuted] = useState(false)

	return (
		<Popover openOnHover>
			<PopoverTrigger>
				<VolumeIcon
					volume={volume}
					isMuted={isMuted}
					setIsMuted={setIsMuted}
				/>
			</PopoverTrigger>
			<VolumePopover
				volume={volume}
				isMuted={isMuted}
				setIsMuted={setIsMuted}
				setVolume={setVolume}
			/>
		</Popover>
	)
}
