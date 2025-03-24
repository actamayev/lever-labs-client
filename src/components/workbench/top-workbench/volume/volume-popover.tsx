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
import { Button, buttonVariants } from "../../../shadcn/ui/button"
import { Slider } from "../../../shadcn/ui/slider"
import { Checkbox } from "../../../shadcn/ui/checkbox"
import { Separator } from "../../../shadcn/ui/separator"

interface Props {
	volume: number
	setVolume: Dispatch<SetStateAction<number>>
	isMuted: boolean
	setIsMuted: Dispatch<SetStateAction<boolean>>
}

export default function VolumePopover(props: Props) {
	const { volume, isMuted, setIsMuted, setVolume } = props
	const [selectedSound, setSelectedSound] = useState("Chime")
	const testSounds = ["Chime", "Beep", "Alert"]

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
		<div className="w-full max-w-sm">
			<div className="flex justify-between mb-1">
				<div>SOUND</div>
				<div
					className="flex flex-row items-center justify-between space-x-2 cursor-pointer"
					onClick={toggleMute}
				>
					<div>MUTE</div>
					<Checkbox checked={isMuted}/>
				</div>
			</div>

			<div className="cursor-pointer mt-3">
				<Slider
					defaultValue={[volume]}
					max={100}
					step={1}
					onValueChange={handleVolumeChange}
					className={cn("duration-0", isMuted ? "opacity-50" : "")}
					value={[volume]}
				/>
			</div>
			<Separator className="my-3" />

			<div className="flex items-center gap-2">
				<Button
					disabled={isMuted}
					className="rounded-xl bg-eel"
				>
					PLAY A TUNE
				</Button>
				<div className="!w-24">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div
								className={cn(
									buttonVariants({
										variant: "outline",
										className: "flex items-center gap-1 rounded-xl justify-between"
									}),
									isMuted ? "opacity-50 pointer-events-none" : ""
								)}
							>
								{toUpper(selectedSound)}
								<ChevronDown className="h-4 w-4" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="rounded-xl bg-standardBackground"
						>
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
	)
}
