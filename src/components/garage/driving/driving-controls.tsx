"use client"

import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import { useGarageContext } from "../../../contexts/garage-context"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { cn } from "../../../lib/shadcn/utils"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

// eslint-disable-next-line max-lines-per-function
function DrivingControls() {
	const garage = useGarageContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const shadowColor = defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"

	// Track which buttons are currently pressed
	const [pressedButtons, setPressedButtons] = useState({
		up: false,
		down: false,
		left: false,
		right: false
	})

	// Handle keyboard events
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Prevent default behavior for arrow keys to avoid page scrolling
			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
				e.preventDefault()
			}

			// Set the appropriate button as pressed
			switch (e.key) {
			case "ArrowUp":
			case "w":
				setPressedButtons(prev => ({ ...prev, up: true }))
				garage.drive("forward")
				break
			case "ArrowDown":
			case "s":
				setPressedButtons(prev => ({ ...prev, down: true }))
				garage.drive("backward")
				break
			case "ArrowLeft":
			case "a":
				setPressedButtons(prev => ({ ...prev, left: true }))
				garage.drive("left")
				break
			case "ArrowRight":
			case "d":
				setPressedButtons(prev => ({ ...prev, right: true }))
				garage.drive("right")
				break
			}
		}

		const handleKeyUp = (e: KeyboardEvent) => {
			// Release the appropriate button
			switch (e.key) {
			case "ArrowUp":
			case "w":
				setPressedButtons(prev => ({ ...prev, up: false }))
				garage.stopDriving("forward")
				break
			case "ArrowDown":
			case "s":
				setPressedButtons(prev => ({ ...prev, down: false }))
				garage.stopDriving("backward")
				break
			case "ArrowLeft":
			case "a":
				setPressedButtons(prev => ({ ...prev, left: false }))
				garage.stopDriving("left")
				break
			case "ArrowRight":
			case "d":
				setPressedButtons(prev => ({ ...prev, right: false }))
				garage.stopDriving("right")
				break
			}
		}

		// Add event listeners
		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		// Clean up event listeners
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [garage])

	// Button press handlers
	const handleButtonDown = (direction: "up" | "down" | "left" | "right") => {
		setPressedButtons(prev => ({ ...prev, [direction]: true }))
		switch (direction) {
		case "up":
			garage.drive("forward")
			break
		case "down":
			garage.drive("backward")
			break
		case "left":
			garage.drive("left")
			break
		case "right":
			garage.drive("right")
			break
		}
	}

	const handleButtonUp = (direction: "up" | "down" | "left" | "right") => {
		setPressedButtons(prev => ({ ...prev, [direction]: false }))
		switch (direction) {
		case "up":
			garage.stopDriving("forward")
			break
		case "down":
			garage.stopDriving("backward")
			break
		case "left":
			garage.stopDriving("left")
			break
		case "right":
			garage.stopDriving("right")
			break
		}
	}

	// Create direct button styles with proper tactile behavior
	const getButtonClasses = (isPressed: boolean) => cn(
		"w-14 h-14 flex items-center justify-center transition-none border-2 rounded-xl",
		"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50",
		"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
		isPressed && "transform translate-y-1 shadow-none bg-blue-300 dark:bg-blue-950"
	)

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 gap-2 w-48">
				{/* Top row - Up button */}
				<div className="col-start-2">
					<TactileButton
						className={getButtonClasses(pressedButtons.up)}
						shadowColor={shadowColor}
						shadowHeight={4}
						onMouseDown={() => handleButtonDown("up")}
						onMouseUp={() => handleButtonUp("up")}
						onMouseLeave={() => pressedButtons.up && handleButtonUp("up")}
						onTouchStart={() => handleButtonDown("up")}
						onTouchEnd={() => handleButtonUp("up")}
					>
						<ArrowUp size={24} />
					</TactileButton>
				</div>

				{/* Middle row with explicit column positioning */}
				<div className="col-start-1">
					<TactileButton
						className={getButtonClasses(pressedButtons.left)}
						shadowColor={shadowColor}
						shadowHeight={4}
						onMouseDown={() => handleButtonDown("left")}
						onMouseUp={() => handleButtonUp("left")}
						onMouseLeave={() => pressedButtons.left && handleButtonUp("left")}
						onTouchStart={() => handleButtonDown("left")}
						onTouchEnd={() => handleButtonUp("left")}
					>
						<ArrowLeft size={24} />
					</TactileButton>
				</div>

				<div className="col-start-2">
					<TactileButton
						className={getButtonClasses(pressedButtons.down)}
						shadowColor={shadowColor}
						shadowHeight={4}
						onMouseDown={() => handleButtonDown("down")}
						onMouseUp={() => handleButtonUp("down")}
						onMouseLeave={() => pressedButtons.down && handleButtonUp("down")}
						onTouchStart={() => handleButtonDown("down")}
						onTouchEnd={() => handleButtonUp("down")}
					>
						<ArrowDown size={24} />
					</TactileButton>
				</div>

				<div className="col-start-3">
					<TactileButton
						className={getButtonClasses(pressedButtons.right)}
						shadowColor={shadowColor}
						shadowHeight={4}
						onMouseDown={() => handleButtonDown("right")}
						onMouseUp={() => handleButtonUp("right")}
						onMouseLeave={() => pressedButtons.right && handleButtonUp("right")}
						onTouchStart={() => handleButtonDown("right")}
						onTouchEnd={() => handleButtonUp("right")}
					>
						<ArrowRight size={24} />
					</TactileButton>
				</div>
			</div>

			{/* Instructions */}
			<div className="mt-4 text-xs text-wolf text-center">
				<p>Use arrow keys, WASD, or tap buttons to drive</p>
			</div>
		</div>
	)
}

export default observer(DrivingControls)
