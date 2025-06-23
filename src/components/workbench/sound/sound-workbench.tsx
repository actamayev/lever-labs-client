/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import TestSounds from "./test-sounds"
import { cn } from "../../../lib/shadcn/utils"
import { Slider } from "../../shadcn/ui/slider"
import { Checkbox } from "../../shadcn/ui/checkbox"
import { Separator } from "../../shadcn/ui/separator"
import workbenchClass from "../../../classes/workbench-class"
import WorkbenchIconTemplate from "../workbench-icon-template"
import changeAudibleStatus from "../../../utils/workbench/change-audible-status"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../shadcn/ui/hover-card"

// eslint-disable-next-line max-lines-per-function
function SoundWorkbench() {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const SpeakerIconToShow = () => {
		const baseClasses = "!h-11 !w-11"
		const strokeWidth = 2.5
		if (workbenchClass.isMuted) {
			return <VolumeOff className={cn(baseClasses, "opacity-50")} strokeWidth={strokeWidth}/>
		}

		if (workbenchClass.volume <= 20) {
			return <Volume className={baseClasses} strokeWidth={strokeWidth}/>
		} else if (workbenchClass.volume <= 40) {
			return <Volume1 className={baseClasses} strokeWidth={strokeWidth}/>
		} else {
			return <Volume2 className={baseClasses} strokeWidth={strokeWidth}/>
		}
	}

	const handleVolumeChange = useCallback((value: number[]) => {
		workbenchClass.setVolume(value[0])
		if (workbenchClass.isMuted && value[0] > 0) {
			workbenchClass.setIsMuted(false)
		}
	}, [])

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
		<HoverCard
			open={isOpen}
			onOpenChange={(open) => {
				// Don't close if dropdown is open
				if (!open && isDropdownOpen) return
				setIsOpen(open)
			}}
			openDelay={0}
			closeDelay={100}
		>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate extraButtonClasses={isOpen ? "border-swan" : ""}>
						<SpeakerIconToShow />
						<span className={cn(
							"text-base font-medium mt-0 w-full text-center",
							workbenchClass.isMuted && "opacity-50"
						)}>
							{workbenchClass.volume}%
						</span>
					</WorkbenchIconTemplate>
				</div>
			</HoverCardTrigger>

			<HoverCardContent
				className={cn(
					"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
					"bg-standardBackground shadow-lg",
					"animate-none duration-0",
				)}
				side="bottom"
				align="center"
				sideOffset={5}
			>
				<div className="w-full max-w-sm space-y-4">
					{/* Header with mute toggle */}
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<div className={cn(
								"w-2 h-2 rounded-full",
								workbenchClass.isMuted ? "bg-cardinal" : "bg-macaw"
							)} />
							<span className="font-medium">SOUND</span>
						</div>
						<div
							className="flex flex-row items-center justify-between space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
							onClick={changeAudibleStatus}
						>
							<div className="text-sm font-medium">MUTE</div>
							<Checkbox checked={workbenchClass.isMuted} />
						</div>
					</div>

					{/* Volume Slider */}
					<div className="space-y-2">
						<div className="flex justify-between items-center text-sm">
							<span className="text-eel/70">Volume</span>
							<span className={cn(
								"font-semibold",
								workbenchClass.isMuted ? "text-eel/50" : "text-eel"
							)}>
								{workbenchClass.volume}%
							</span>
						</div>
						<div
							className="cursor-pointer"
							onKeyDown={handleKeyDown}
							tabIndex={0}
						>
							<Slider
								defaultValue={[workbenchClass.volume]}
								max={100}
								step={1}
								onValueChange={handleVolumeChange}
								className={cn("duration-0", workbenchClass.isMuted ? "opacity-50" : "")}
								value={[workbenchClass.volume]}
								onKeyDown={handleKeyDown}
							/>
						</div>
					</div>

					<Separator className="my-3" />

					<TestSounds isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen}/>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}

export default observer(SoundWorkbench)
