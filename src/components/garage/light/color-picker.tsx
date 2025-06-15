"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import Wheel from "@uiw/react-color-wheel"
import { rgbaToHsva } from "@uiw/color-convert"
import garageClass from "../../../classes/garage-class"

function ColorPicker() {
	const colorToShow = useMemo(() => {
		// This is done to ensure the shade of the color wheel stays constant
		const hsva = rgbaToHsva(garageClass.selectedColorRgba)
		hsva.v = 100
		return hsva
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [garageClass.selectedColorRgba.r, garageClass.selectedColorRgba.g, garageClass.selectedColorRgba.b])

	return (
		<div className="flex flex-col items-start justify-center">
			<div className="w-full max-w-[225px] h-[225px]">
				<Wheel
					color={colorToShow}
					onChange={(colorResult) => garageClass.setSelectedColorRgba(colorResult.rgba)}
					width={225}
					height={225}
				/>
			</div>
		</div>
	)
}

export default observer(ColorPicker)
