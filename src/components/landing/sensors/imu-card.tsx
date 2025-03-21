"use client"

import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import CompassRotationAnimation from "../../icon-animations/compass-rotation-animation"

export default function IMUCard() {
	return (
		<SensorsSkeleton
			title="Motion Tracker"
			description="Track orientation, speed, and acceleration"
			icon={<CompassRotationAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-1 lg:col-start-1 lg:row-start-3"
		/>
	)
}
