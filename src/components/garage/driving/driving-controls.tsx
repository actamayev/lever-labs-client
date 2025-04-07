"use client"

import { observer } from "mobx-react"
import { useState, useEffect } from "react"
import ArrowKeyButton from "./arrow-key-button"
import useHybridDrivingControls from "../../../hooks/garage/use-driving-controls"

function DrivingControls() {
	const { handleButtonDown, handleButtonUp, isButtonPressed } = useHybridDrivingControls()

	// State for visual button feedback
	const [pressedButtons, setPressedButtons] = useState({
		up: false,
		down: false,
		left: false,
		right: false
	})

	// Sync the visual state with the actual pressed keys
	useEffect(() => {
		const updatePressedButtons = () => {
			setPressedButtons({
				up: isButtonPressed("up"),
				down: isButtonPressed("down"),
				left: isButtonPressed("left"),
				right: isButtonPressed("right")
			})
		}

		// Update initially
		updatePressedButtons()

		// Set up an interval to keep the visual state synced
		const intervalId = setInterval(updatePressedButtons, 100)

		return () => {
			clearInterval(intervalId)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Remove isButtonPressed from the dependency array

	// Wrapper functions to update visual state alongside actual state
	const onButtonDown = (direction: "up" | "down" | "left" | "right") => {
		handleButtonDown(direction)
		setPressedButtons(prev => ({...prev, [direction]: true}))
	}

	const onButtonUp = (direction: "up" | "down" | "left" | "right") => {
		handleButtonUp(direction)
		setPressedButtons(prev => ({...prev, [direction]: false}))
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 gap-2 w-48">
				{/* Top row - Up button */}
				<div className="col-start-2">
					<ArrowKeyButton
						direction="up"
						isPressed={pressedButtons.up}
						onButtonDown={onButtonDown}
						onButtonUp={onButtonUp}
					/>
				</div>

				{/* Middle row with explicit column positioning */}
				<div className="col-start-1">
					<ArrowKeyButton
						direction="left"
						isPressed={pressedButtons.left}
						onButtonDown={onButtonDown}
						onButtonUp={onButtonUp}
					/>
				</div>

				<div className="col-start-2">
					<ArrowKeyButton
						direction="down"
						isPressed={pressedButtons.down}
						onButtonDown={onButtonDown}
						onButtonUp={onButtonUp}
					/>
				</div>

				<div className="col-start-3">
					<ArrowKeyButton
						direction="right"
						isPressed={pressedButtons.right}
						onButtonDown={onButtonDown}
						onButtonUp={onButtonUp}
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
