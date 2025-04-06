"use client"

import { useState, useEffect } from "react"
import { HexColorPicker, HexColorInput } from "react-colorful"
import { observer } from "mobx-react"
import { useGarageContext } from "../../contexts/garage-context"

function ColorPicker ()  {
	const garage = useGarageContext()
	const [color, setColor] = useState(garage.selectedColor)

	// When color changes, update the store and apply to selected dots
	useEffect(() => {
		if (color) {
			garage.setSelectedColor(color)

			// Apply the color to all selected dots
			if (garage.selectedDots && garage.selectedDots.length > 0) {
				garage.updateDotColor(garage.selectedDots, color)
			}
		}
	}, [color, garage])

	return (
		<div className="flex flex-col items-center space-y-3">
			{/* Color wheel picker */}
			<HexColorPicker
				color={color}
				onChange={setColor}
				className="w-full max-w-[180px]"
			/>

			{/* Text input for hex code */}
			<div className="flex items-center space-x-2">
				<span className="text-sm font-medium">Hex:</span>
				<HexColorInput
					color={color}
					onChange={setColor}
					className="p-1 border border-gray-300 rounded text-sm w-24 text-center bg-inherit"
				/>
			</div>

			{/* RGB values display */}
			<div className="flex items-center space-x-2">
				<div
					className="w-6 h-6 rounded-full border border-gray-300"
					style={{ backgroundColor: color }}
				/>
				<span className="text-xs">
					Current Color
				</span>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
