
"use client"

import { Dispatch, SetStateAction } from "react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "../../../lib/utils"
import playTone from "../../../utils/garage/play-fun-tone"
import workbenchClass from "../../../classes/workbench-class"
import garageClass from "../../../classes/garage-class"
import { Button, buttonVariants } from "../../ui/button"
import CustomTooltip from "../../custom-tooltip"
import { ToneType } from "@lever-labs/common-ts/protocol"

// Helper function to convert ToneType enum value to letter
const getToneLetter = (tone: ToneType): string => {
	const toneToLetter: Record<ToneType, string> = {
		[ToneType.A]: "A",
		[ToneType.B]: "B",
		[ToneType.C]: "C",
		[ToneType.D]: "D",
		[ToneType.E]: "E",
		[ToneType.F]: "F",
		[ToneType.G]: "G",
	}
	return toneToLetter[tone] || tone.toString()
}

// Helper function to get button tooltip content
const getButtonTooltipContent = (isSoundsDisabled: boolean, isMuted: boolean): string => {
	if (isSoundsDisabled) {
		return "Sounds disabled by teacher"
	}
	if (isMuted) {
		return "Sounds are muted"
	}
	return "Play a tone"
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

// eslint-disable-next-line max-lines-per-function
function TestSounds(props: Props): React.ReactNode {
	const { isDropdownOpen, setIsDropdownOpen } = props
	const testTones: ToneType[] = [ToneType.A, ToneType.B, ToneType.C, ToneType.D, ToneType.E, ToneType.F, ToneType.G]

	// Check if sounds are disabled by teacher
	const isSoundsDisabled = !garageClass.garageTonesStatus

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
								onMouseDown={async (): Promise<void> => {
									if (!workbenchClass.isMuted && !isSoundsDisabled) {
										await playTone(workbenchClass.selectedTone)
									}
								}}
								onMouseUp={async (): Promise<void> => {
									if (!workbenchClass.isMuted && !isSoundsDisabled) {
										await playTone(null)
									}
								}}
								onMouseLeave={async (): Promise<void> => {
									if (!workbenchClass.isMuted && !isSoundsDisabled) {
										await playTone(null)
									}
								}}
								onTouchStart={async (): Promise<void> => {
									if (!workbenchClass.isMuted && !isSoundsDisabled) {
										await playTone(workbenchClass.selectedTone)
									}
								}}
								onTouchEnd={async (): Promise<void> => {
									if (!workbenchClass.isMuted && !isSoundsDisabled) {
										await playTone(null)
									}
								}}
							>
								PLAY TONE
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
							<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
								<DropdownMenuTrigger asChild className="cursor-pointer">
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
											{toUpper(getToneLetter(workbenchClass.selectedTone))}
										</span>
										<ChevronDown className="h-3 w-3" />
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="rounded-xl bg-standard-background border-swan shadow-none"
									align="end"
								>
									{testTones.map((tone): React.ReactNode => (
										<DropdownMenuItem
											key={tone}
											onClick={(): void => {
												workbenchClass.setSelectedTone(tone)
												setIsDropdownOpen(false)
											}}
											className="cursor-pointer transition-none hover:bg-polar! rounded-lg"
										>
											<span className="text-sm font-medium">
												{toUpper(getToneLetter(tone))}
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
