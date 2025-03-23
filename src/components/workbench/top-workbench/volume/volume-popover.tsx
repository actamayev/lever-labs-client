import toUpper from "lodash-es/toUpper"
import { ChevronDown } from "lucide-react"
import { useCallback, Dispatch, SetStateAction, useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { cn } from "../../../../lib/shadcn/utils"
import { Button } from "../../../shadcn/ui/button"
import { Slider } from "../../../shadcn/ui/slider"
import { PopoverContent } from "@/components/shadcn/ui/popover"

interface Props {
	volume: number
	setVolume: Dispatch<SetStateAction<number>>
	isMuted: boolean
	setIsMuted: Dispatch<SetStateAction<boolean>>
}

export default function VolumePopover(props: Props) {
	const { volume, isMuted, setIsMuted, setVolume } = props
	const [selectedSound, setSelectedSound] = useState("Chime")
	const testSounds = ["Chime", "Beep", "Alert", "Welcome"]

	const handleVolumeChange = useCallback((value: number[]) => {
		setVolume(value[0])
		if (isMuted && value[0] > 0) {
			setIsMuted(false)
		}
	}, [isMuted, setIsMuted, setVolume])
	
	// Toggle mute when speaker icon is clicked
	const toggleMute = useCallback(() => {
		setIsMuted(!isMuted)
	}, [isMuted, setIsMuted])

	return (
		<PopoverContent className="w-80">
			<div className="ml-4 w-full max-w-sm">
				<div className="mb-6 cursor-pointer">
					<Slider
						defaultValue={[volume]}
						max={100}
						step={1}
						onValueChange={handleVolumeChange}
						className={cn("duration-0", isMuted ? "opacity-50" : "")}
						value={[volume]}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Button
						disabled={isMuted}
						className="rounded-xl bg-eel"
					>
						PLAY A TUNE
					</Button>
					<div className="!w-32">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="flex items-center gap-1 rounded-xl" disabled={isMuted}>
									{toUpper(selectedSound)}
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="rounded-xl bg-standardBackground">
								{testSounds.map((sound) => (
									<DropdownMenuItem
										key={sound}
										onClick={() => setSelectedSound(sound)}
										className="cursor-pointer transition-none hover:!bg-polar"
									>
										{toUpper(sound)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</PopoverContent>
	)
}
