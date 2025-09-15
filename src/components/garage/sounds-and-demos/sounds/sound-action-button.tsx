"use client"

import { Bot } from "lucide-react"
import { observer } from "mobx-react"
import { useRef, useEffect } from "react"
import { FunSounds } from "@bluedotrobots/common-ts/types/garage"
import { cn } from "../../../../lib/shadcn/utils"
import CustomTooltip from "../../../custom-tooltip"
import { CustomUfo } from "../../../icons/custom-ufo"
import { CustomFart } from "../../../icons/custom-fart"
import garageClass from "../../../../classes/garage-class"
import { CustomEngine } from "../../../icons/custom-engine"
import { CustomElephant } from "../../../icons/custom-elephant"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { CustomCountdown } from "../../../icons/custom-countdown"
import playFunSound from "../../../../utils/garage/play-fun-sound"
import { CustomPartyPopper } from "../../../icons/custom-party-popper"
import { CustomHearNoEvilMonkey } from "../../../icons/custom-hear-no-evil-monkey"
import { CustomSpeakNoEvilMonkey } from "../../../icons/custom-speak-no-evil-monkey"

interface SoundActionButtonProps {
	sound: FunSounds
	index: number
	extraClasses?: {
		buttonClasses: string
		shadowColor: string
		iconClasses: string
		iconSize: string
	}
}

// Helper function to get sound icon
const getSoundIcon = (sound: FunSounds, iconSize: string): React.ReactNode => {
	switch (sound) {
		case "Fart":
			return <CustomFart className={iconSize} />
		case "Monkey":
			if (garageClass.soundPlaying === "Monkey") {
				return <CustomHearNoEvilMonkey className={iconSize} />
			}
			return <CustomSpeakNoEvilMonkey className={iconSize} />
		case "Elephant":
			return <CustomElephant className={iconSize} />
		case "Party":
			return <CustomPartyPopper className={iconSize} />
		case "UFO":
			return <CustomUfo className={iconSize} />
		case "Countdown":
			return <CustomCountdown className={iconSize} />
		case "Robot":
			return <Bot className={iconSize} />
		case "Engine":
			return <CustomEngine className={iconSize} />
	}
}

// Helper function to get button classes based on disabled state
const getButtonClasses = (isDisabled: boolean, extraClasses?: string): string => {
	const baseClasses = "duration-150 w-20 h-20 flex items-center justify-center rounded-xl"
	const stateClasses = isDisabled
		? "bg-gray-300/20 text-gray-400 cursor-not-allowed dark:bg-gray-600/20 dark:text-gray-500"
		: "bg-sandboxOrange/20 text-sandboxOrange dark:bg-sandboxOrange/80 dark:text-orange-200"
	const focusClasses = "outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"

	return cn(baseClasses, stateClasses, focusClasses, extraClasses)
}

// Helper function to get border classes for the index span
const getBorderClasses = (isDisabled: boolean, extraClasses?: string): string => {
	const baseClasses = "absolute top-1 left-1 w-5 h-5 flex items-center justify-center border-2 rounded-md text-xs font-medium"
	const stateClasses = isDisabled
		? "border-gray-300/40 dark:border-gray-500/40"
		: "border-sandboxOrange/40 dark:border-[rgb(255,189,153)] " +
			"group-active:border-selectedSidebarButtonBorder group-active:text-answerText"

	return cn(baseClasses, stateClasses, extraClasses)
}

// Helper function to render the tooltip trigger
const renderTooltipTrigger = (params: {
	buttonRef: React.RefObject<HTMLButtonElement>
	isDisabled: boolean
	extraClasses: SoundActionButtonProps["extraClasses"]
	handleButtonDown: () => void
	handleButtonUp: () => void
	index: number
	sound: FunSounds
	iconSize: string
}): React.ReactNode => {
	const { buttonRef, isDisabled, extraClasses, handleButtonDown, handleButtonUp, index, sound, iconSize } = params

	return (
		<div className="relative">
			<TactileButton
				ref={buttonRef}
				className={getButtonClasses(isDisabled, extraClasses?.buttonClasses)}
				shadowColor={isDisabled ? "rgb(156 163 175)" : (extraClasses?.shadowColor || "rgb(255 189 153)")}
				onMouseDown={handleButtonDown}
				onMouseUp={handleButtonUp}
				onMouseLeave={handleButtonUp}
				onTouchStart={handleButtonDown}
				onTouchEnd={handleButtonUp}
				disabled={isDisabled}
			>
				<span className={getBorderClasses(isDisabled, extraClasses?.iconClasses)}>
					{index}
				</span>
				<div className={cn(isDisabled && "opacity-50")}>
					{getSoundIcon(sound, iconSize)}
				</div>
			</TactileButton>
			{/* Invisible overlay for tooltip when disabled */}
			{isDisabled && (
				<div className="absolute inset-0 cursor-not-allowed" />
			)}
		</div>
	)
}

function SoundActionButton(props: SoundActionButtonProps): React.ReactNode {
	const { sound, index, extraClasses } = props
	const buttonRef = useRef<HTMLButtonElement>(null)
	const iconSize = extraClasses?.iconSize || "!size-10"

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (garageClass.soundPlaying === sound) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.soundPlaying, sound])

	// Release button when sounds are disabled
	useEffect((): void => {
		if (!garageClass.garageSoundsStatus && garageClass.soundPlaying === sound) {
			garageClass.setSoundPlaying(null)
		}
	}, [garageClass.garageSoundsStatus, sound])

	// Handle button click for action buttons
	const handleButtonDown = (): void => {
		// Only play sound if garage sounds are enabled
		if (garageClass.garageSoundsStatus) {
			playFunSound(sound)
		}
	}

	// Handle button release for action buttons
	const handleButtonUp = (): void => {
		// Reset the sound playing state when button is released
		if (garageClass.soundPlaying === sound) {
			garageClass.setSoundPlaying(null)
		}
	}

	const isDisabled = !garageClass.garageSoundsStatus

	return (
		<CustomTooltip
			tooltipTrigger={renderTooltipTrigger({
				buttonRef,
				isDisabled,
				extraClasses,
				handleButtonDown,
				handleButtonUp,
				index,
				sound,
				iconSize
			})}
			tooltipContent={
				isDisabled
					? "Sounds disabled by teacher"
					: `Play ${sound} sound`
			}
		/>
	)
}

export default observer(SoundActionButton)
