"use client"

import { observer } from "mobx-react"
import { ReactNode, useRef, useEffect } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../../../../lib/shadcn/utils"
import { TactileButton } from "../../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../../hooks/memos/default-site-theme"
import { useGarageContext } from "../../../../contexts/garage-context"
import useComputeMotorControl from "../../../../hooks/garage/compute-motor-control"
import useApplyMotorControl from "../../../../hooks/garage/apply-motor-control"

function ArrowKeyButton({ direction }: { direction: MotorDirection }) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const defaultSiteTheme = useDefaultSiteTheme()
	const shadowColor = defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"
	const garageClass = useGarageContext()
	const computeMotorControl = useComputeMotorControl()
	const applyMotorControl = useApplyMotorControl()

	// Map direction to the correct icon
	const getMotorDirectionIcon = (): ReactNode => {
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
	useEffect(() => {
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

	const handleButtonDown = () => {
		garageClass.setPressedKey(direction, Date.now())

		const motorControl = computeMotorControl()
		applyMotorControl(motorControl)
	}

	const handleButtonUp = () => {
		garageClass.removePressedKey(direction)

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
