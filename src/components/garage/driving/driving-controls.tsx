"use client"

import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useGarageContext } from "../../../contexts/garage-context"
import ArrowKeyButton from "./arrow-key-button" // Make sure the path is correct

// eslint-disable-next-line max-lines-per-function
function DrivingControls() {
	const garage = useGarageContext()
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
	const handleButtonDown = (direction: MotorDirection) => {
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

	const handleButtonUp = (direction: MotorDirection) => {
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

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 gap-2 w-48">
				{/* Top row - Up button */}
				<div className="col-start-2">
					<ArrowKeyButton
						direction="up"
						isPressed={pressedButtons.up}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>

				{/* Middle row with explicit column positioning */}
				<div className="col-start-1">
					<ArrowKeyButton
						direction="left"
						isPressed={pressedButtons.left}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>

				<div className="col-start-2">
					<ArrowKeyButton
						direction="down"
						isPressed={pressedButtons.down}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
				</div>

				<div className="col-start-3">
					<ArrowKeyButton
						direction="right"
						isPressed={pressedButtons.right}
						onButtonDown={handleButtonDown}
						onButtonUp={handleButtonUp}
					/>
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
