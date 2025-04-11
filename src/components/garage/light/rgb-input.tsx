/* eslint-disable max-len */
"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { useGarageContext } from "../../../contexts/garage-context"

function RGBInput() {
	const garageClass = useGarageContext()

	// Function to enforce RGB range (0-255)
	const enforceRGBRange = useCallback((value: string) => {
		const numValue = parseInt(value || "0")
		return Math.min(Math.max(numValue, 0), 255)
	}, [])

	return (
		<>
			<div className="flex items-center flex-col">
				<span className="text-2xl font-medium mr-1">R</span>
				<Input
					type="number"
					value={Math.round(garageClass.selectedColorRgba.r * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("r", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-swan rounded-xl !text-xl text-center bg-inherit h-12 w-20 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-2xl font-medium mr-1">G</span>
				<Input
					type="number"
					value={Math.round(garageClass.selectedColorRgba.g * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("g", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-swan rounded-xl !text-xl text-center bg-inherit h-12 w-20 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-2xl font-medium mr-1">B</span>
				<Input
					type="number"
					value={Math.round(garageClass.selectedColorRgba.b * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("b", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-swan rounded-xl !text-xl text-center bg-inherit h-12 w-20 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
				/>
			</div>
		</>
	)
}

export default observer(RGBInput)
