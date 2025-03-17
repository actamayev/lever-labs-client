"use client"

import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import LEDColorChangeAnimation from "../../icon-animations/led-color-change-animation"

export default function LEDCard() {
	return (
		<SensorsSkeleton
			title="8 RGB LEDs"
			description="Create dazzling light displays"
			icon={<LEDColorChangeAnimation iconSize={bentoIconSize} />}
			outerDivStyles="col-span-1 lg:col-start-1 lg:row-start-1"
		/>
	)
}
