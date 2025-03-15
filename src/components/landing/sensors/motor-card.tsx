"use client"

import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import MotorSpinAnimation from "../../icon-animations/motor-spin-animation"

export default function MotorCard() {
	return (
		<SensorsSkeleton
			title="2 Motors + Encoders"
			description="Motors with precise position tracking for controlled movement"
			icon={<MotorSpinAnimation iconSize={bentoIconSize}/>}
			outerDivStyles="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-2"
		/>
	)
}
