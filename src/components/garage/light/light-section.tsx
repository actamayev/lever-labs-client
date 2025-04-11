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
			<div className="w-full grid grid-cols-3 gap-2">
				<div className="ml-[18px]">
					<ColorPicker />
				</div>

				<div className="flex flex-col items-center justify-center h-full mx-2">
					<div className="flex w-full h-1/3 items-start justify-center">
						<LightAnimationsList />
					</div>
					<div className="flex w-full h-1/3 items-center justify-between mb-2.5">
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
