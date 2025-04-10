"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import useColorChange from "../../../hooks/garage/color-change"
import { useGarageContext } from "../../../contexts/garage-context"

function RGBInput() {
	const garageClass = useGarageContext()
	const handleColorChange = useColorChange()

	// Handle RGB input change
	const handleRgbChange = useCallback((component: "r" | "g" | "b", value: number) => {
		const currentRgbValue = garageClass.selectedColor

		currentRgbValue[component] = Math.max(0, Math.min(255, value))
		handleColorChange(currentRgbValue)
	}, [garageClass.selectedColor, handleColorChange])

	return (
		<div className="flex items-center space-x-2">
			<div className="flex items-center flex-col">
				<span className="text-sm font-medium mr-1">R</span>
				<input
					type="number"
					value={garageClass.selectedColor.r}
					onChange={(e) => handleRgbChange("r", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="p-1 border border-swan rounded text-sm text-center bg-inherit"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-sm font-medium mr-1">G</span>
				<input
					type="number"
					value={garageClass.selectedColor.g}
					onChange={(e) => handleRgbChange("g", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="p-1 border border-swan rounded text-sm text-center bg-inherit"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-sm font-medium mr-1">B</span>
				<input
					type="number"
					value={garageClass.selectedColor.b}
					onChange={(e) => handleRgbChange("b", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="p-1 border border-swan rounded text-sm text-center bg-inherit"
				/>
			</div>
		</div>
	)
}

export default observer(RGBInput)
