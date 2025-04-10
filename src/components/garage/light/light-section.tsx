import RgbInput from "./rgb-input"
import ColorPicker from "./color-picker"
import LightDotsSelector from "./light-dots-selector"
import LightAnimationsList from "./light-animations-list"
import LightBrightnessSlider from "./light-brightness-slider"
import ColorOptionsList from "./color-options-list"

export default function LightSection() {
	return (
		<div className="h-1/3 overflow-hidden">
			<div className="w-full grid grid-cols-3 gap-2 px-4">
				<div className="flex items-center justify-center flex-col">
					<ColorPicker />
					<ColorOptionsList />
				</div>

				<div className="flex flex-col items-center justify-center h-full py-6">
					<LightAnimationsList />
					<RgbInput />
					<LightBrightnessSlider />
				</div>

				<div className="flex items-center justify-center">
					<LightDotsSelector />
				</div>
			</div>
		</div>
	)
}
