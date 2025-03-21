"use client"

import SensorsSkeleton from "./sensors-skeleton"
import IRSensorAnimation from "../../icon-animations/ir-sensor-animation"

export default function IRSensorCard() {
	return (
		<SensorsSkeleton
			title="IR Sensors"
			description="Detect black and white"
			icon={<IRSensorAnimation />}
			outerDivStyles="col-span-1 lg:col-start-1 lg:row-start-3"
		/>
	)
}
