/* eslint-disable max-len */
"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { Label } from "../../shadcn/ui/label"
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
				<Label htmlFor="rgb-r" className="text-xl font-medium mb-0.5">R</Label>
				<Input
					id="rgb-r"
					type="number"
					value={Math.round(garageClass.selectedColorRgba.r * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("r", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-red-300 rounded-xl !text-xl text-center bg-red-300 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					style={{ width: "72px", height: "52px" }}
				/>
			</div>
			<div className="flex items-center flex-col">
				<Label htmlFor="rgb-g" className="text-xl font-medium mb-0.5">G</Label>
				<Input
					id="rgb-g"
					type="number"
					value={Math.round(garageClass.selectedColorRgba.g * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("g", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-green-300 rounded-xl !text-xl text-center bg-green-300 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					style={{ width: "72px", height: "52px" }}
				/>
			</div>
			<div className="flex items-center flex-col">
				<Label htmlFor="rgb-b" className="text-xl font-medium mb-0.5">B</Label>
				<Input
					id="rgb-b"
					type="number"
					value={Math.round(garageClass.selectedColorRgba.b * garageClass.selectedColorShade)}
					onChange={(e) => garageClass.updateSelectedColorByField("b", enforceRGBRange(e.target.value))}
					min="0"
					max="255"
					className="border-2 border-blue-200 rounded-xl !text-xl text-center bg-blue-200 shadow-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
					style={{ width: "72px", height: "52px" }}
				/>
			</div>
		</>
	)
}

export default observer(RGBInput)
