"use client"

import { observer } from "mobx-react"
import { useRef, useEffect } from "react"
import { ToneType } from "@actamayev/lever-labs-common-ts/protocol"
import { cn } from "../../../../lib/utils"
import CustomTooltip from "../../../custom-tooltip"
import garageClass from "../../../../classes/garage-class"
import { TactileButton } from "../../../buttons/tactile-button"
import playFunTone from "../../../../utils/garage/play-fun-tone"

interface ToneActionButtonProps {
	tone: ToneType
	index: number
	extraClasses?: {
		buttonClasses: string
		shadowColor: string
		iconClasses: string
		iconSize: string
	}
}

// Helper function to convert ToneType enum value to letter
const getToneLetter = (tone: ToneType): string => {
	const toneToLetter: Record<Exclude<ToneType, ToneType.OFF>, string> = {
		[ToneType.A]: "A",
		[ToneType.B]: "B",
		[ToneType.C]: "C",
		[ToneType.D]: "D",
		[ToneType.E]: "E",
		[ToneType.F]: "F",
		[ToneType.G]: "G",
	}
	return toneToLetter[tone as Exclude<ToneType, ToneType.OFF>] || tone.toString()
}

// Helper function to get button classes based on disabled state
const getButtonClasses = (isDisabled: boolean, extraClasses?: string): string => {
	const baseClasses = "duration-0 w-20 h-20 flex items-center justify-center rounded-xl"
	const stateClasses = isDisabled
		? "bg-gray-300/20 text-gray-400 cursor-not-allowed dark:bg-gray-600/20 dark:text-gray-500"
		: "bg-sandbox-orange/20 text-sandbox-orange dark:bg-sandbox-orange/80 dark:text-orange-200"
	const focusClasses = "outline-hidden focus:outline-hidden focus:ring-0 focus-visible:outline-hidden focus-visible:ring-0"

	return cn(baseClasses, stateClasses, focusClasses, extraClasses)
}

// Helper function to get border classes for the index span
const getBorderClasses = (isDisabled: boolean, extraClasses?: string): string => {
	const baseClasses = "absolute top-1 left-1 w-5 h-5 flex items-center justify-center border-2 rounded-sm text-xs font-medium"
	const stateClasses = isDisabled
		? "border-gray-300/40 dark:border-gray-500/40"
		: "border-sandbox-orange/40 dark:border-[rgb(255,189,153)] " +
			"group-active:border-selected-sidebar-button-border group-active:text-answer-text"

	return cn(baseClasses, stateClasses, extraClasses)
}

// Helper function to render the tooltip trigger
const renderTooltipTrigger = (params: {
	buttonRef: React.RefObject<HTMLButtonElement | null>
	isDisabled: boolean
	extraClasses: ToneActionButtonProps["extraClasses"]
	handleButtonDown: () => void
	handleButtonUp: () => void
	index: number
	tone: ToneType
}): React.ReactNode => {
	const { buttonRef, isDisabled, extraClasses, handleButtonDown, handleButtonUp, index, tone } = params

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
				<div className={cn(
					"text-2xl font-bold",
					isDisabled && "opacity-50"
				)}>
					{getToneLetter(tone)}
				</div>
			</TactileButton>
			{/* Invisible overlay for tooltip when disabled */}
			{isDisabled && (
				<div className="absolute inset-0 cursor-not-allowed" />
			)}
		</div>
	)
}

function ToneActionButton(props: ToneActionButtonProps): React.ReactNode {
	const { tone, index, extraClasses } = props
	const buttonRef = useRef<HTMLButtonElement>(null)

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (garageClass.tonePlaying === tone) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.tonePlaying, tone])

	// Release button when sounds are disabled
	useEffect((): void => {
		if (!garageClass.garageTonesStatus && garageClass.tonePlaying === tone) {
			playFunTone(null)
		}
	}, [tone])

	// Handle button click for action buttons
	const handleButtonDown = (): void => {
		// Only play sound if garage sounds are enabled
		if (garageClass.garageTonesStatus) {
			playFunTone(tone)
		}
	}

	// Handle button release for action buttons
	const handleButtonUp = (): void => {
		// Stop the sound when button is released
		if (garageClass.tonePlaying === tone) {
			playFunTone(null)
		}
	}

	const isDisabled = !garageClass.garageTonesStatus

	return (
		<CustomTooltip
			tooltipTrigger={renderTooltipTrigger({
				buttonRef,
				isDisabled,
				extraClasses,
				handleButtonDown,
				handleButtonUp,
				index,
				tone
			})}
			tooltipContent={
				isDisabled
					? "Sounds disabled by teacher"
					: `Play ${getToneLetter(tone)} tone`
			}
		/>
	)
}

export default observer(ToneActionButton)
