"use client"

import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import CompassRotationAnimation from "../../icon-animations/compass-rotation-animation"

export default function IMUCard() {
	return (
		<SensorsSkeleton
			title="Motion Tracker"
			description="Tracks orientation, speed, and acceleration"
			icon={<CompassRotationAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-2 lg:col-start-2 lg:row-start-5"
		/>
	)
}
