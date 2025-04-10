"use client"

import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import { rgbaToHsva } from "@uiw/color-convert"
import useColorChange from "../../../hooks/garage/color-change"
import { useGarageContext } from "../../../contexts/garage-context"

function ColorPicker() {
	const garage = useGarageContext()
	const handleColorChange = useColorChange()

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full max-w-[180px] h-[180px]">
				<Wheel
					color={rgbaToHsva(garage.selectedColor)}
					onChange={(colorResult) => handleColorChange(colorResult.rgba)}
					width={180}
					height={180}
				/>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
