import ColorPicker from "./color-picker"
import LightAnimationsList from "./light-animations-list"
import LightDotsSelector from "./light-dots-selector"
import RgbInput from "./rgb-input"

export default function LightSection() {
	return (
		<div className="h-1/3 overflow-hidden">
			<div className="w-full grid grid-cols-3 gap-2 p-4">
				<div className="flex items-center justify-center">
					<ColorPicker />
				</div>

				<div className="flex items-center justify-center flex-col">
					<LightAnimationsList />
					<RgbInput />
				</div>

				<div className="flex items-center justify-center">
					<LightDotsSelector />
				</div>
			</div>
		</div>
	)
}
