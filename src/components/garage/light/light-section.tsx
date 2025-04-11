"use client"

import { observer } from "mobx-react"
import RgbInput from "./rgb-input"
import ColorPicker from "./color-picker"
import LightDotsSelector from "./light-dots-selector"
import LightAnimationsList from "./light-animations-list"
import LightBrightnessControl from "./light-brightness-control"
import useSetDefaultColorsUseEffect from "../../../hooks/garage/set-dots-colors-use-effect"

function LightSection() {
	useSetDefaultColorsUseEffect()

	return (
		<div className="h-1/3 overflow-hidden">
			<div className="w-full grid grid-cols-3 gap-2 px-4">
				<ColorPicker />

				<div className="flex flex-col items-center justify-center h-full mx-4">
					<div className="flex w-full h-1/3 items-start justify-center">
						<LightAnimationsList />
					</div>
					<div className="flex w-full h-1/3 items-center justify-center space-x-2">
						<RgbInput />
					</div>
					<div className="flex w-full h-1/3 items-end justify-between">
						<LightBrightnessControl />
					</div>
				</div>

				<LightDotsSelector />
			</div>
		</div>
	)
}

export default observer(LightSection)
