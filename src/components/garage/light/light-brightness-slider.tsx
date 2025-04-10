import { observer } from "mobx-react"
import { hsvaToRgba, rgbaToHsva } from "@uiw/color-convert"
import ShadeSlider from "@uiw/react-color-shade-slider"
import { useGarageContext } from "../../../contexts/garage-context"
import useColorChange from "../../../hooks/garage/color-change"

function LightBrightnessSlider() {
	const garageClass = useGarageContext()
	const colorChange = useColorChange()

	return (
		<div className="w-64 rounded-full">
			<ShadeSlider
				hsva={rgbaToHsva(garageClass.selectedColor)}
				onChange={(newShade) => {
					const currentHsva = rgbaToHsva(garageClass.selectedColor)
					currentHsva.v = newShade.v
					colorChange(hsvaToRgba(currentHsva))
				}}
				className="rounded-full"
			/>
		</div>
	)
}

export default observer(LightBrightnessSlider)
