"use client"

import { observer } from "mobx-react"
import { Input } from "../../shadcn/ui/input"
import { useGarageContext } from "../../../contexts/garage-context"

function RGBInput() {
	const garageClass = useGarageContext()

	return (
		<div className="flex items-center justify-center space-x-2 w-full mb-8">
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">R</span>
				<Input
					value={garageClass.selectedColorRgba.r}
					onChange={(e) => garageClass.updateSelectedColorByField("r", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">G</span>
				<Input
					value={garageClass.selectedColorRgba.g}
					onChange={(e) => garageClass.updateSelectedColorByField("g", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
			<div className="flex items-center flex-col">
				<span className="text-xl font-medium mr-1">B</span>
				<Input
					value={garageClass.selectedColorRgba.b}
					onChange={(e) => garageClass.updateSelectedColorByField("b", parseInt(e.target.value || "0"))}
					min="0"
					max="255"
					className="border-2 border-swan rounded !text-lg text-center bg-inherit h-12 w-20 shadow-none"
				/>
			</div>
		</div>
	)
}

export default observer(RGBInput)
