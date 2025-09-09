"use client"

import { observer } from "mobx-react"
import { useRef, useEffect } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import getGarageClass from "../../../classes/garage-class"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import getPersonalInfoClass from "../../../classes/personal-info-class"
import applyMotorControl from "../../../utils/garage/apply-motor-control"
import computeMotorControl from "../../../utils/garage/compute-motor-control"

function ArrowKeyButton({ direction }: { direction: MotorDirection }): React.ReactNode {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowColor = getPersonalInfoClass().defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"

	// Map direction to the correct icon
	const getMotorDirectionIcon = (): React.ReactNode => {
		switch (direction) {
			case "up":
				return <ArrowUp className="!size-12" strokeWidth={2.5}/>
			case "down":
				return <ArrowDown className="!size-12" strokeWidth={2.5}/>
			case "left":
				return <ArrowLeft className="!size-12" strokeWidth={2.5}/>
			case "right":
				return <ArrowRight className="!size-12" strokeWidth={2.5}/>
		}
	}

	// Update button styling directly when isPressed changes
	useEffect((): void => {
		if (!buttonRef.current) return

		const buttonElement = buttonRef.current

		if (getGarageClass().pressedMotorKeys.has(direction)) {
			// Force the button to look pressed regardless of hover state
			buttonElement.style.transform = "translateY(0.25rem)"
			buttonElement.style.boxShadow = "none"
		} else {
			// Reset to normal state
			buttonElement.style.transform = ""
			buttonElement.style.boxShadow = ""
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [direction, getGarageClass().pressedMotorKeys.size])

	const handleButtonDown = (): void => {
		getGarageClass().setPressedKey(direction, Date.now())

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	const handleButtonUp = (): void => {
		getGarageClass().removePressedKey(direction)

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
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
			{getMotorDirectionIcon()}
		</TactileButton>
	)
}

export default observer(ArrowKeyButton)
