import { observer } from "mobx-react"
import RgbInput from "./rgb-input"
import ColorPicker from "./color-picker"
import LightDotsSelector from "./light-dots-selector"
import LightAnimationsList from "./light-animations-list"
import LightBrightnessSlider from "./light-brightness-slider"
import useSetDefaultColorsUseEffect from "../../../hooks/garage/set-dots-colors-use-effect"

function LightSection() {
	useSetDefaultColorsUseEffect()

	return (
		<div className="h-1/3 overflow-hidden">
			<div className="w-full grid grid-cols-3 gap-2 px-4">
				<ColorPicker />

				<div className="flex flex-col items-center justify-center">
					<LightAnimationsList />
					<RgbInput />
					<LightBrightnessSlider />
				</div>

				<LightDotsSelector />
			</div>
		</div>
	)
}

export default observer(LightSection)
