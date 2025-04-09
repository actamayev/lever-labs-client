"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../../lib/shadcn/utils"
import { CustomHorn } from "../../../icons/custom-horn"
import { usePipContext } from "../../../../contexts/pip-context"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import { CustomHeadlights } from "../../../icons/custom-headlights"
import { useGarageContext } from "../../../../contexts/garage-context"
import { useSocketContext } from "../../../../contexts/socket-context"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"

interface ArrowKeyButtonProps {
	action: Actions
	isPressed: boolean
}

// eslint-disable-next-line max-lines-per-function
function DrivingActionButton({
	action,
	isPressed,
}: ArrowKeyButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
	const shadowColor = defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"
	const garageClass = useGarageContext()
	const socketClass = useSocketContext()
	const pipClass = usePipContext()

	// Map direction to the correct icon
	const getActionIcon = (): ReactNode => {
		switch (action) {
		case "headlights":
			return <CustomHeadlights size={24} />
		case "horn":
			return <CustomHorn size={24} />
		}
	}

	// Update button state based on keyboard inputs
	useEffect(() => {
		if (action === "headlights") {
			isPressed = garageClass.areHeadlightsOn
		} else if (action === "horn") {
			isPressed = garageClass.isHornPressed
		}
	}, [action, garageClass.areHeadlightsOn, garageClass.isHornPressed])

	// Update button styling directly when isPressed changes
	useEffect(() => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (isPressed) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
			buttonElement.classList.add("bg-blue-300")
			buttonElement.classList.add("dark:bg-blue-950")
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
			buttonElement.classList.remove("bg-blue-300")
			buttonElement.classList.remove("dark:bg-blue-950")
		}
	}, [isPressed])

	// Handle button click for action buttons
	const handleButtonDown = () => {
		if (action === "headlights") {
			garageClass.setAreHeadlightsOn(true)

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					headlightsStatus: true
				})
			}
		} else if (action === "horn") {
			garageClass.setIsHornPressed(true)

			if (pipClass.selectedPip) {
				socketClass.emitHornSound({
					pipUUID: pipClass.selectedPip.pipUUID,
					hornStatus: true
				})
			}
		}
	}

	// Handle button release for action buttons
	const handleButtonUp = () => {
		if (action === "headlights") {
			garageClass.setAreHeadlightsOn(false)

			if (pipClass.selectedPip) {
				socketClass.emitHeadLightStatus({
					pipUUID: pipClass.selectedPip.pipUUID,
					headlightsStatus: false
				})
			}
		} else if (action === "horn") {
			garageClass.setIsHornPressed(false)

			if (pipClass.selectedPip) {
				socketClass.emitHornSound({
					pipUUID: pipClass.selectedPip.pipUUID,
					hornStatus: false
				})
			}
		}
	}

	// Create button styles with proper tactile behavior
	const getButtonClasses = () => cn(
		"w-14 h-14 flex items-center justify-center transition-none border-2 rounded-xl",
		"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50",
		"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
		"focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
	)

	return (
		<TactileButton
			ref={buttonRef}
			className={getButtonClasses()}
			shadowColor={shadowColor}
			shadowHeight={4}
			onMouseDown={handleButtonDown}
			onMouseUp={handleButtonUp}
			onMouseLeave={() => isPressed && handleButtonUp()}
			onTouchStart={handleButtonDown}
			onTouchEnd={handleButtonUp}
		>
			{getActionIcon()}
		</TactileButton>
	)
}

export default observer(DrivingActionButton)
