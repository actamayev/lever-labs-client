import { observer } from "mobx-react"
import { rgbaToHsva } from "@uiw/color-convert"
import ShadeSlider from "@uiw/react-color-shade-slider"
import { useGarageContext } from "../../../contexts/garage-context"

function LightBrightnessSlider() {
	const garageClass = useGarageContext()

	return (
		<div className="w-3/4 cursor-pointer">
			<ShadeSlider
				hsva={rgbaToHsva(garageClass.realColor)}
				onChange={(newShade) => garageClass.setColorShade(newShade.v / 100)}
				radius="9999px"
			/>
		</div>
	)
}

export default observer(LightBrightnessSlider)
