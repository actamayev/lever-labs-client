/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client"
import { useState, useMemo, useCallback } from "react"
import { Volume, Volume1, Volume2, ChevronDown, VolumeOff } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import WorkbenchCardTemplate from "./workbench-card-template"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu"
import { Button } from "../shadcn/ui/button"
import { Slider } from "../shadcn/ui/slider"

// eslint-disable-next-line max-lines-per-function
export default function VolumeWorkbench() {
	const [volume, setVolume] = useState(70)
	const [isMuted, setIsMuted] = useState(false)
	const [selectedSound, setSelectedSound] = useState("Chime")
	const [playingMessage, setPlayingMessage] = useState("")
	const [isPlaying, setIsPlaying] = useState(false)

	// Available test sounds
	const testSounds = ["Chime", "Beep", "Notification", "Alert", "Welcome"]

	// Toggle mute when speaker icon is clicked
	const toggleMute = useCallback(() => {
		setIsMuted(!isMuted)
	}, [isMuted])

	// Play test sound
	const playTestSound = useCallback(() => {
		if (isPlaying) return // Prevent multiple plays

		setIsPlaying(true)
		setPlayingMessage(`Playing ${selectedSound}`)

		// Reset message and playing state after 3 seconds
		setTimeout(() => {
			setPlayingMessage("")
			setIsPlaying(false)
		}, 3000)
	}, [isPlaying, selectedSound])

	// CSS classes for animation
	const fadeAnimation = useMemo(() => {
		return isPlaying ? "opacity-100 transition-opacity duration-300" : "opacity-0 transition-opacity duration-300"
	}, [isPlaying])

	// Handle volume change
	const handleVolumeChange = useCallback((value: number[]) => {
		setVolume(value[0])
		if (isMuted && value[0] > 0) {
			setIsMuted(false)
		}
	}, [isMuted])

	// Determine which speaker icon to show based on volume level
	function SpeakerIconToShow() {
		const baseClasses = "h-12 w-12 cursor-pointer"

		if (isMuted) {
			return <VolumeOff className={baseClasses} onClick={toggleMute} />
		}

		if (volume <= 20) {
			return <Volume className={baseClasses} onClick={toggleMute} />
		} else if (volume <= 40) {
			return <Volume1 className={baseClasses} onClick={toggleMute} />
		} else {
			return <Volume2 className={baseClasses} onClick={toggleMute} />
		}
	}

	return (
		<WorkbenchCardTemplate>
			<div className="flex items-start">
				<div className={cn("flex flex-col items-center justify-center ml-0.5", isMuted ? "text-eel/50" : "text-eel")}>
					<SpeakerIconToShow />
					<span className={cn("text-base font-medium")}>
						{isMuted ? "Muted" : `${volume}%`}
					</span>
				</div>
				<div className="ml-8 mt-2 w-full max-w-sm">
					<div className="mb-6 cursor-pointer">
						<Slider
							defaultValue={[volume]}
							max={100}
							step={1}
							disabled={isMuted}
							onValueChange={handleVolumeChange}
							className={cn(isMuted ? "opacity-50" : "")}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Button
							onClick={playTestSound}
							disabled={isMuted}
							className="rounded-xl bg-eel"
						>
							Try a Sound
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="flex items-center gap-1 rounded-xl" disabled={isMuted}>
									{selectedSound}
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="rounded-xl">
								{testSounds.map((sound) => (
									<DropdownMenuItem
										key={sound}
										onClick={() => setSelectedSound(sound)}
										className="cursor-pointer transition-none"
									>
										{sound}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						{playingMessage && (
							<span className={cn("text-macaw ml-2 text-sm", fadeAnimation)}>
								{playingMessage}
							</span>
						)}
					</div>
				</div>
			</div>
		</WorkbenchCardTemplate>
	)
}
