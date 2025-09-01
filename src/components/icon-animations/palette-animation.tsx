"use client"

import { useCallback, useState } from "react"
import { CustomPalette } from "../icons/custom-palette"
import { observer } from "mobx-react"


const COLORS = [
	"rgb(255, 0, 0)",    // Red
	"rgb(0, 255, 0)",    // Green
	"rgb(0, 0, 255)",    // Blue
	"default"            // Default color (will use Tailwind class)
]

function PaletteAnimation({ iconSize } : { iconSize: number }): React.ReactNode {
	const [colorIndex, setColorIndex] = useState(-1) // -1 for initial state

	const handleClick = useCallback((): void => {
		setColorIndex((prevIndex): number => (prevIndex + 1) % COLORS.length)
	}, [])

	// Check if we should use the default color (Tailwind class)
	const isDefaultColor = colorIndex === -1 || COLORS[colorIndex] === "default"

	// Only set inline style if not using default color
	const colorStyle = isDefaultColor ? {} : { color: COLORS[colorIndex] }

	return (
		<div
			className="pointer-events-auto w-fit relative cursor-pointer"
			onClick={handleClick}
		>
			<CustomPalette
				className={`transition-colors duration-300 ${isDefaultColor ? "text-questionText" : ""}`}
				style={colorStyle}
				size={iconSize}
			/>
		</div>
	)
}

export default observer(PaletteAnimation)
