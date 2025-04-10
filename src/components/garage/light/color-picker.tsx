"use client"

import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import { rgbaToHsva } from "@uiw/color-convert"
import useColorChange from "../../../hooks/garage/color-change"
import { useGarageContext } from "../../../contexts/garage-context"

function ColorPicker() {
	const garageClass = useGarageContext()
	const handleColorChange = useColorChange()

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-[225px] h-[225px]">
				<Wheel
					color={rgbaToHsva(garageClass.selectedColorRgba)}
					onChange={(colorResult) => handleColorChange(colorResult.rgba)}
					width={225}
					height={225}
				/>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
