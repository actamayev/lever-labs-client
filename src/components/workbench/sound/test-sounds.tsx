
"use client"

import { Dispatch, SetStateAction } from "react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { TuneToPlay } from "@bluedotrobots/common-ts/types/workbench"
import { ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { cn } from "../../../lib/shadcn/utils"
import playTune from "../../../utils/workbench/play-tune"
import workbenchClass from "../../../classes/workbench-class"
import garageClass from "../../../classes/garage-class"
import { Button, buttonVariants } from "../../shadcn/ui/button"
import CustomTooltip from "../../custom-tooltip"

// Helper function to get button tooltip content
const getButtonTooltipContent = (isSoundsDisabled: boolean, isMuted: boolean): string => {
	if (isSoundsDisabled) {
		return "Sounds disabled by teacher"
	}
	if (isMuted) {
		return "Sounds are muted"
	}
	return "Play a tune"
}

// Helper function to get dropdown tooltip content
const getDropdownTooltipContent = (isSoundsDisabled: boolean, isMuted: boolean): string => {
	if (isSoundsDisabled) {
		return "Sounds disabled by teacher"
	}
	if (isMuted) {
		return "Sounds are muted"
	}
	return "Select sound type"
}

interface Props {
	isDropdownOpen: boolean
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}

function TestSounds(props: Props): React.ReactNode {
	const { isDropdownOpen, setIsDropdownOpen } = props
	const testSounds: TuneToPlay[] = ["Chime", "Chirp", "Drop", "Pop"]

	// Check if sounds are disabled by teacher
	const isSoundsDisabled = !garageClass.garageSoundsStatus

	return (
		<div className="space-y-3">
			<div className="text-sm font-medium text-eel/70">Test Sounds</div>
			<div className="flex items-center gap-2">
				<CustomTooltip
					tooltipTrigger={
						<div className="flex-1 relative">
							<Button
								disabled={workbenchClass.isMuted || isSoundsDisabled}
								className={cn(
									"rounded-xl bg-eel flex-1 w-full",
									isSoundsDisabled && "opacity-50 cursor-not-allowed"
								)}
								onClick={playTune}
							>
								PLAY A TUNE
							</Button>
							{/* Invisible overlay for tooltip when disabled */}
							{isSoundsDisabled && (
								<div className="absolute inset-0 cursor-not-allowed" />
							)}
						</div>
					}
					tooltipContent={getButtonTooltipContent(isSoundsDisabled, workbenchClass.isMuted)}
				/>
				<CustomTooltip
					tooltipTrigger={
						<div className="w-24 relative">
							<DropdownMenu
								open={isDropdownOpen}
								onOpenChange={setIsDropdownOpen}
							>
								<DropdownMenuTrigger asChild>
									<div
										className={cn(
											buttonVariants({
												variant: "outline",
												className: "flex items-center gap-1 rounded-xl justify-between w-full h-9 px-2 shadow-none"
											}),
											(workbenchClass.isMuted || isSoundsDisabled) && "opacity-50 pointer-events-none"
										)}
									>
										<span className="text-xs font-medium">
											{toUpper(workbenchClass.selectedSound)}
										</span>
										<ChevronDown className="h-3 w-3" />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="rounded-xl bg-standardBackground border-swan shadow-none"
									align="end"
								>
									{testSounds.map((sound): React.ReactNode => (
										<DropdownMenuItem
											key={sound}
											onClick={(): void => {
												workbenchClass.setSelectedSound(sound)
												setIsDropdownOpen(false)
											}}
											className="cursor-pointer transition-none hover:!bg-polar rounded-lg"
										>
											<span className="text-sm font-medium">
												{toUpper(sound)}
											</span>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
							{/* Invisible overlay for tooltip when disabled */}
							{isSoundsDisabled && (
								<div className="absolute inset-0 cursor-not-allowed" />
							)}
						</div>
					}
					tooltipContent={getDropdownTooltipContent(isSoundsDisabled, workbenchClass.isMuted)}
				/>
			</div>
		</div>
	)
}

export default observer(TestSounds)
