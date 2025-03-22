/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client"
import toUpper from "lodash-es/toUpper"
import { ChevronDown } from "lucide-react"
import { useState, useCallback } from "react"
import VolumeIcon from "./volume-icon"
import WorkbenchCardTemplate from "../workbench-card-template"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown-menu"
import { Button } from "../../shadcn/ui/button"
import { Slider } from "../../shadcn/ui/slider"

// eslint-disable-next-line max-lines-per-function
export default function VolumeWorkbench() {
	const [volume, setVolume] = useState(70)
	const [isMuted, setIsMuted] = useState(false)
	const [selectedSound, setSelectedSound] = useState("Chime")

	// Available test sounds
	const testSounds = ["Chime", "Beep", "Alert", "Welcome"]

	// Handle volume change
	const handleVolumeChange = useCallback((value: number[]) => {
		setVolume(value[0])
		if (isMuted && value[0] > 0) {
			setIsMuted(false)
		}
	}, [isMuted])

	return (
		<WorkbenchCardTemplate>
			<div className="flex items-center">
				<VolumeIcon
					volume={volume}
					isMuted={isMuted}
					setIsMuted={setIsMuted}
				/>
				<div className="ml-4 w-full max-w-sm">
					<div className="mb-6 cursor-pointer">
						<Slider
							defaultValue={[volume]}
							max={100}
							step={1}
							onValueChange={handleVolumeChange}
							className={isMuted ? "opacity-50" : ""}
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
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="flex items-center gap-1 rounded-xl" disabled={isMuted}>
									{toUpper(selectedSound)}
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
										{toUpper(sound)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</WorkbenchCardTemplate>
	)
}
