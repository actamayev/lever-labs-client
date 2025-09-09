"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomHorn } from "../../icons/custom-horn"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomHeadlights } from "../../icons/custom-headlights"
import garageActions from "../../../utils/garage/garage-actions"
import getPersonalInfoClass from "../../../classes/personal-info-class"

interface ArrowKeyButtonProps {
	action: Actions
	isPressed: boolean
}


function DrivingActionButton({
	action,
	isPressed,
}: ArrowKeyButtonProps): React.ReactNode {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowColor = getPersonalInfoClass().defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"
	const { activateAction, deactivateAction } = garageActions()

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

	// Handle button click for action buttons
	const handleButtonDown = (): void => {
		activateAction(action)
	}

	// Handle button release for action buttons
	const handleButtonUp = (): void => {
		deactivateAction(action)
	}

	return (
		<TactileButton
			ref={buttonRef}
			className={cn(
				"duration-150 w-20 h-20 flex items-center justify-center rounded-xl",
				"bg-blue-100 text-blue-800",
				"dark:bg-blue-900 dark:text-blue-200",
				"outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
			)}
			shadowColor={shadowColor}
			onMouseDown={handleButtonDown}
			onMouseUp={handleButtonUp}
			onMouseLeave={handleButtonUp}
			onTouchStart={handleButtonDown}
			onTouchEnd={handleButtonUp}
		>
			<span className={cn(
				"absolute top-1 left-1 w-5 h-5 flex items-center justify-center",
				"border-2 rounded-md text-xs font-medium border-blue-400 dark:border-blue-600",
				"group-active:border-selectedSidebarButtonBorder group-active:text-answerText dark:group-active:text-answerText"
			)}>
				{action === "headlights" ? "Q" : "E" }
			</span>
			{getActionIcon()}
		</TactileButton>
	)
}

export default observer(DrivingActionButton)
