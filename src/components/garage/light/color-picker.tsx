"use client"

import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import { useState, useEffect, useCallback } from "react"
import { hsvaToHex, hsvaToRgba, rgbaToHsva } from "@uiw/color-convert"
import { useGarageContext } from "../../../contexts/garage-context"

function ColorPicker() {
	const garage = useGarageContext()
	const [hsva, setHsva] = useState({ h: 0, s: 100, v: 100, a: 1 })

	// Get RGB values using the library conversion
	const getRgbValues = useCallback(() => {
		const rgba = hsvaToRgba(hsva)
		return {
			r: Math.round(rgba.r),
			g: Math.round(rgba.g),
			b: Math.round(rgba.b)
		}
	}, [hsva])

	// Handle RGB input change using library conversion
	const handleRgbChange = useCallback((component: "r" | "g" | "b", value: number) => {
		const rgb = getRgbValues()
		rgb[component] = Math.max(0, Math.min(255, value))

		// Convert RGB to HSVA using the library function
		const newHsva = rgbaToHsva({
			r: rgb.r,
			g: rgb.g,
			b: rgb.b,
			a: hsva.a
		})

		setHsva(newHsva)
	}, [getRgbValues, hsva.a])

	// When hsva changes, update the garage
	useEffect(() => {
		const hexColor = hsvaToHex(hsva)
		garage.setSelectedColor(hexColor)

		// Apply the color to all selected dots
		if (garage.selectedDots && garage.selectedDots.length > 0) {
			garage.updateDotColor(garage.selectedDots, hexColor)
		}
	}, [hsva, garage])

	const rgb = getRgbValues()

	return (
		<div className="flex flex-col items-center space-y-4">
			{/* Color wheel picker */}
			<div className="w-full max-w-[180px] h-[180px]">
				<Wheel
					color={hsva}
					onChange={(color) => setHsva(color.hsva)}
					width={180}
					height={180}
				/>
			</div>

			{/* RGB input fields */}
			<div className="flex items-center space-x-2">
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">R:</span>
					<input
						type="number"
						value={rgb.r}
						onChange={(e) => handleRgbChange("r", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-gray-300 rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">G:</span>
					<input
						type="number"
						value={rgb.g}
						onChange={(e) => handleRgbChange("g", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-gray-300 rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
				<div className="flex items-center">
					<span className="text-sm font-medium mr-1">B:</span>
					<input
						type="number"
						value={rgb.b}
						onChange={(e) => handleRgbChange("b", parseInt(e.target.value || "0"))}
						min="0"
						max="255"
						className="p-1 border border-gray-300 rounded text-sm w-14 text-center bg-inherit"
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
