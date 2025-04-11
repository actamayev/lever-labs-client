"use client"

import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import { rgbaToHsva } from "@uiw/color-convert"
import { useGarageContext } from "../../../contexts/garage-context"

function ColorPicker() {
	const garageClass = useGarageContext()

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-[225px] h-[225px]">
				<Wheel
					color={rgbaToHsva(garageClass.selectedColorRgba)}
					onChange={(colorResult) => garageClass.setSelectedColorRgba(colorResult.rgba)}
					width={225}
					height={225}
				/>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
