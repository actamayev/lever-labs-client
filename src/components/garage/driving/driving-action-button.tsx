"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomHorn } from "../../icons/custom-horn"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomHeadlights } from "../../icons/custom-headlights"
import garageActions from "../../../utils/garage/garage-actions"
import personalInfoClass from "../../../classes/personal-info-class"
import garageClass from "../../../classes/garage-class"
import CustomTooltip from "../../custom-tooltip"

interface ArrowKeyButtonProps {
	action: Actions
	isPressed: boolean
}

// Helper function to get button classes based on disabled state
const getButtonClasses = (isDisabled: boolean): string => {
	const baseClasses = "duration-150 w-20 h-20 flex items-center justify-center rounded-xl"
	const stateClasses = isDisabled
		? "bg-gray-300/20 text-gray-400 cursor-not-allowed dark:bg-gray-600/20 dark:text-gray-500"
		: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
	const focusClasses = "outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"

	return cn(baseClasses, stateClasses, focusClasses)
}

// Helper function to get border classes for the index span
const getBorderClasses = (isDisabled: boolean): string => {
	const baseClasses = "absolute top-1 left-1 w-5 h-5 flex items-center justify-center border-2 rounded-md text-xs font-medium"
	const stateClasses = isDisabled
		? "border-gray-300/40 dark:border-gray-500/40"
		: "border-blue-400 dark:border-blue-600 " +
			"group-active:border-selectedSidebarButtonBorder group-active:text-answerText dark:group-active:text-answerText"

	return cn(baseClasses, stateClasses)
}

// Helper function to get tooltip content
const getTooltipContent = (isDisabled: boolean, action: Actions): string => {
	if (isDisabled) {
		if (action === "headlights") {
			return "Headlights disabled by teacher"
		}
		return "Horn disabled by teacher"
	}
	if (action === "headlights") {
		return "Toggle headlights (Q)"
	}
	return "Honk horn (E)"
}

function DrivingActionButton({
	action,
	isPressed,
}: ArrowKeyButtonProps): React.ReactNode {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowColor = personalInfoClass.defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"
	const { activateAction, deactivateAction } = garageActions()

	// Check if the action should be disabled
	const isDisabled = (action === "horn" && !garageClass.garageSoundsStatus) ||
		(action === "headlights" && !garageClass.garageLightsStatus)

	// Map direction to the correct icon
	const getActionIcon = (): ReactNode => {
		switch (action) {
			case "headlights":
				return <CustomHeadlights className="!size-10" />
			case "horn":
				return <CustomHorn className="!size-10" />
		}
	}

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (isPressed) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	}, [isPressed])

	// Release button when action is disabled
	useEffect((): void => {
		if (isDisabled && isPressed) {
			deactivateAction(action)
		}
	}, [isDisabled, isPressed, action, deactivateAction])

	// Handle button click for action buttons
	const handleButtonDown = (): void => {
		// Only activate if not disabled
		if (!isDisabled) {
			activateAction(action)
		}
	}

	// Handle button release for action buttons
	const handleButtonUp = (): void => {
		// Only deactivate if not disabled
		if (!isDisabled) {
			deactivateAction(action)
		}
	}

	return (
		<CustomTooltip
			tooltipTrigger={
				<div className="relative">
					<TactileButton
						ref={buttonRef}
						className={getButtonClasses(isDisabled)}
						shadowColor={isDisabled ? "rgb(156 163 175)" : shadowColor}
						onMouseDown={handleButtonDown}
						onMouseUp={handleButtonUp}
						onMouseLeave={handleButtonUp}
						onTouchStart={handleButtonDown}
						onTouchEnd={handleButtonUp}
						disabled={isDisabled}
					>
						<span className={getBorderClasses(isDisabled)}>
							{action === "headlights" ? "Q" : "E" }
						</span>
						<div className={cn(isDisabled && "opacity-50")}>
							{getActionIcon()}
						</div>
					</TactileButton>
					{/* Invisible overlay for tooltip when disabled */}
					{isDisabled && (
						<div className="absolute inset-0 cursor-not-allowed" />
					)}
				</div>
			}
			tooltipContent={getTooltipContent(isDisabled, action)}
		/>
	)
}

export default observer(DrivingActionButton)
