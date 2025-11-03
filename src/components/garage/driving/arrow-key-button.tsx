"use client"

import { observer } from "mobx-react"
import { useRef, useEffect } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../../../lib/utils"
import garageClass from "../../../classes/garage-class"
import { TactileButton } from "../../buttons/tactile-button"
import personalInfoClass from "../../../classes/personal-info-class"
import applyMotorControl from "../../../utils/garage/apply-motor-control"
import computeMotorControl from "../../../utils/garage/compute-motor-control"
import CustomTooltip from "../../custom-tooltip"

// Helper function to get button classes based on disabled state
const getButtonClasses = (isDisabled: boolean): string => {
	const baseClasses = "duration-0 w-20 h-20 flex items-center justify-center rounded-xl"
	const stateClasses = isDisabled
		? "bg-gray-300/20 text-gray-400 cursor-not-allowed dark:bg-gray-600/20 dark:text-gray-500"
		: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
	const focusClasses = "outline-hidden focus:outline-hidden focus:ring-0 focus-visible:outline-hidden focus-visible:ring-0"

	return cn(baseClasses, stateClasses, focusClasses)
}

// Helper function to get tooltip content
const getTooltipContent = (isDisabled: boolean, direction: MotorDirection): string => {
	if (isDisabled) {
		return "Driving disabled by teacher"
	}

	const keyMap: Record<MotorDirection, string> = {
		up: "Move forward (W/↑)",
		down: "Move backward (S/↓)",
		left: "Turn counter-clockwise (A/←)",
		right: "Turn clockwise (D/→)"
	}

	return keyMap[direction]
}

function ArrowKeyButton({ direction }: { direction: MotorDirection }): React.ReactNode {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowColor = personalInfoClass.defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"

	// Check if driving should be disabled
	const isDisabled = !garageClass.garageDrivingStatus

	// Map direction to the correct icon
	const getMotorDirectionIcon = (): React.ReactNode => {
		switch (direction) {
			case "up":
				return <ArrowUp className="size-12!" strokeWidth={2.5}/>
			case "down":
				return <ArrowDown className="size-12!" strokeWidth={2.5}/>
			case "left":
				return <ArrowLeft className="size-12!" strokeWidth={2.5}/>
			case "right":
				return <ArrowRight className="size-12!" strokeWidth={2.5}/>
		}
	}

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (garageClass.pressedMotorKeys.has(direction)) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [direction, garageClass.pressedMotorKeys.size])

	// Release button when driving is disabled
	useEffect((): void => {
		if (isDisabled && garageClass.pressedMotorKeys.has(direction)) {
			garageClass.removePressedKey(direction)
			const motorControl = computeMotorControl()
			applyMotorControl(motorControl)
		}
	}, [isDisabled, direction])

	const handleButtonDown = (): void => {
		// Only activate if not disabled
		if (!isDisabled) {
			garageClass.setPressedKey(direction, Date.now())

			const motorControl = computeMotorControl()
			applyMotorControl(motorControl)
		}
	}

	const handleButtonUp = (): void => {
		// Only deactivate if not disabled
		if (!isDisabled) {
			garageClass.removePressedKey(direction)

			const motorControl = computeMotorControl()
			applyMotorControl(motorControl)
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
						<div className={cn(isDisabled && "opacity-50")}>
							{getMotorDirectionIcon()}
						</div>
					</TactileButton>
					{/* Invisible overlay for tooltip when disabled */}
					{isDisabled && (
						<div className="absolute inset-0 cursor-not-allowed" />
					)}
				</div>
			}
			tooltipContent={getTooltipContent(isDisabled, direction)}
		/>
	)
}

export default observer(ArrowKeyButton)
