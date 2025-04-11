"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { cn } from "../../../lib/shadcn/utils"
import { Slider } from "../../shadcn/ui/slider"
import { Checkbox } from "../../shadcn/ui/checkbox"
import { Separator } from "../../shadcn/ui/separator"
import usePlayTune from "../../../hooks/workbench/play-tune"
import { Button, buttonVariants } from "../../shadcn/ui/button"
import { useWorkbenchContext } from "../../../contexts/workbench-context"
import useChangeAudibleStatus from "../../../hooks/workbench/change-audible-status"

function VolumeContent() {
	const workbenchClass = useWorkbenchContext()
	const testSounds: TuneToPlay[] = ["Chime", "Beep", "Alert"]
	const playTune = usePlayTune()
	const changeAudibleStatus = useChangeAudibleStatus()

	const handleVolumeChange = useCallback((value: number[]) => {
		workbenchClass.setVolume(value[0])
		if (workbenchClass.isMuted && value[0] > 0) {
			workbenchClass.setIsMuted(false)
		}
	}, [workbenchClass])

	const handleKeyDown = (event: React.KeyboardEvent) => {
		// Prevent arrow keys from changing slider value
		if (
			event.key === "ArrowUp" ||
			event.key === "ArrowDown" ||
			event.key === "ArrowLeft" ||
			event.key === "ArrowRight"
		) {
			event.preventDefault()
		}
	}

	return (
		<div className="w-full max-w-sm">
			<div className="flex justify-between mb-1">
				<div>SOUND</div>
				<div
					className="flex flex-row items-center justify-between space-x-2 cursor-pointer"
					onClick={changeAudibleStatus}
				>
					<div>MUTE</div>
					<Checkbox checked={workbenchClass.isMuted}/>
				</div>
			</div>

			<div
				className="cursor-pointer mt-3"
				onKeyDown={handleKeyDown}
				tabIndex={0} // Make div focusable to capture key events
			>
				<Slider
					defaultValue={[workbenchClass.volume]}
					max={100}
					step={1}
					onValueChange={handleVolumeChange}
					className={cn("duration-0", workbenchClass.isMuted ? "opacity-50" : "")}
					value={[workbenchClass.volume]}
					onKeyDown={handleKeyDown} // Add key handler directly to Slider
				/>
			</div>
			<Separator className="my-3" />

			<div className="flex items-center gap-2">
				<Button
					disabled={workbenchClass.isMuted}
					className="rounded-xl bg-eel"
					onClick={playTune}
				>
					PLAY A TUNE
				</Button>
				<div className="!w-24">
					<DropdownMenu onOpenChange={(open: boolean) => workbenchClass.setIsDropdownOpen(open)}>
						<DropdownMenuTrigger asChild>
							<div
								className={cn(
									buttonVariants({
										variant: "outline",
										className: "flex items-center gap-1 rounded-xl justify-between"
									}),
									workbenchClass.isMuted && "opacity-50 pointer-events-none"
								)}
							>
								{toUpper(workbenchClass.selectedSound)}
								<ChevronDown className="h-4 w-4" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="rounded-xl bg-standardBackground">
							{testSounds.map((sound) => (
								<DropdownMenuItem
									key={sound}
									onClick={() => workbenchClass.setSelectedSound(sound)}
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

export default observer(VolumeContent)
