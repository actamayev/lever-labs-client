/* eslint-disable max-len */
"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react"
import TestSounds from "./test-sounds"
import { cn } from "../../../lib/shadcn/utils"
import { Slider } from "../../ui/slider"
import { Checkbox } from "../../ui/checkbox"
import { Separator } from "../../ui/separator"
import workbenchClass from "../../../classes/workbench-class"
import WorkbenchIconTemplate from "../workbench-icon-template"
import changeAudibleStatus from "../../../utils/workbench/change-audible-status"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/hover-card"
import handleVolumeChange from "../../../utils/workbench/handle-volume-change"
import CustomTooltip from "../../custom-tooltip"
import garageClass from "../../../classes/garage-class"

// eslint-disable-next-line max-lines-per-function, complexity
function SoundWorkbench(): React.ReactNode {
	const [isOpen, setIsOpen] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const isSoundsDisabled = !garageClass.garageSoundsStatus

	const SpeakerIconToShow = (): React.ReactNode => {
		const baseClasses = "h-16! w-16!"
		const strokeWidth = 2.5
		if (workbenchClass.isMuted || isSoundsDisabled) {
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

	const handleKeyDown = (event: React.KeyboardEvent): void => {
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
			onOpenChange={(open): void => {
				// Don't close if dropdown is open
				if (!open && isDropdownOpen) return
				setIsOpen(open)
			}}
			openDelay={0}
			closeDelay={100}
		>
			<HoverCardTrigger asChild>
				<div>
					<WorkbenchIconTemplate>
						<SpeakerIconToShow />
						<span
							className={cn(
								"text-2xl font-medium -mt-2 w-full text-center",
								(workbenchClass.isMuted || isSoundsDisabled) && "opacity-50"
							)}
						>
							{workbenchClass.volume}%
						</span>
					</WorkbenchIconTemplate>
				</div>
			</HoverCardTrigger>

			<HoverCardContent
				className={cn(
					"w-80 p-4 border-2 border-swan rounded-2xl text-eel text-base",
					"bg-standard-background",
					"animate-none duration-0",
				)}
				side="bottom"
				align="end"
				sideOffset={20}
			>
				<div className="w-full max-w-sm space-y-4">
					{/* Header with mute toggle */}
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<div className={cn(
								"w-2 h-2 rounded-full",
								(workbenchClass.isMuted || isSoundsDisabled) ? "bg-cardinal" : "bg-macaw"
							)} />
							<span className="font-medium">SOUND</span>
						</div>
						<div className="relative">
							<div
								className={cn(
									"flex flex-row items-center justify-between space-x-2 cursor-pointer hover:opacity-80 transition-opacity",
									isSoundsDisabled && "opacity-50 cursor-not-allowed hover:opacity-100"
								)}
								onClick={(): Promise<void> => isSoundsDisabled ? Promise.resolve() : changeAudibleStatus(!workbenchClass.isMuted)}
							>
								<div className="text-sm font-medium">MUTE</div>
								<Checkbox checked={workbenchClass.isMuted || isSoundsDisabled} />
							</div>
							{isSoundsDisabled && (
								<CustomTooltip
									tooltipTrigger={<div className="absolute inset-0 cursor-not-allowed" />}
									tooltipContent="Sounds disabled by teacher"
								/>
							)}
						</div>
					</div>

					{/* Volume Slider */}
					<div className="space-y-2">
						<div className="flex justify-between items-center text-sm">
							<span className="text-eel/70">Volume</span>
							<span className={cn(
								"font-semibold",
								(workbenchClass.isMuted || isSoundsDisabled) ? "text-eel/50" : "text-eel"
							)}>
								{workbenchClass.volume}%
							</span>
						</div>
						<div className="relative">
							<div
								className={cn("cursor-pointer", (workbenchClass.isMuted || isSoundsDisabled) && "opacity-50 cursor-not-allowed")}
								onKeyDown={handleKeyDown}
								tabIndex={0}
							>
								<Slider
									defaultValue={[workbenchClass.volume]}
									max={100}
									step={1}
									onValueChange={isSoundsDisabled ? (): void => {} : handleVolumeChange}
									className={cn("duration-0", (workbenchClass.isMuted || isSoundsDisabled) ? "opacity-50" : "")}
									value={[workbenchClass.volume]}
									onKeyDown={handleKeyDown}
									disabled={isSoundsDisabled}
								/>
							</div>
							{isSoundsDisabled && (
								<CustomTooltip
									tooltipTrigger={<div className="absolute inset-0 cursor-not-allowed" />}
									tooltipContent="Sounds disabled by teacher"
								/>
							)}
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
