"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import useColorChange from "../../../hooks/garage/color-change"
import { useGarageContext } from "../../../contexts/garage-context"
import { Input } from "../../shadcn/ui/input"

function RGBInput() {
	const garageClass = useGarageContext()
	const handleColorChange = useColorChange()

	// Handle RGB input change
	const handleRgbChange = useCallback((component: "r" | "g" | "b", value: number) => {
		const currentRgbValue = garageClass.selectedColorRgba

		currentRgbValue[component] = Math.max(0, Math.min(255, value))
		handleColorChange(currentRgbValue)
	}, [garageClass.selectedColorRgba, handleColorChange])

	return (
		<div className="flex items-center justify-center space-x-2 w-full mb-8">
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">R</span>
				<Input
					value={garageClass.selectedColorRgba.r}
					onChange={(e) => handleRgbChange("r", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">G</span>
				<Input
					value={garageClass.selectedColorRgba.g}
					onChange={(e) => handleRgbChange("g", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">B</span>
				<Input
					value={garageClass.selectedColorRgba.b}
					onChange={(e) => handleRgbChange("b", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
		</div>
	)
}

export default observer(RGBInput)
