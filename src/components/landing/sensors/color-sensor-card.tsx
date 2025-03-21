"use client"

import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import PaletteAnimation from "../../icon-animations/palette-animation"

export default function ColorSensorCard() {
	return (
		<SensorsSkeleton
			title="Color Sensor"
			description="Clearly captures color"
			icon={<PaletteAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-start-2 lg:row-start-4"
		/>
	)
}
