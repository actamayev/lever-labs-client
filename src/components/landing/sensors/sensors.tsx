import React from "react"
import LEDCard from "./led-card"
import IMUCard from "./imu-card"
import MotorCard from "./motor-card"
import ButtonCard from "./button-card"
import ModuleCard from "./module-card"
import DistanceSensorsCard from "./distance-sensors-card"
import { BentoGrid } from "../../shadcn/ui/custom-bento-grid"

const features: React.ReactNode[] = [
	<LEDCard key="LED"/>,
	<IMUCard key="IMU" />,
	<DistanceSensorsCard key="Distance Sensor" />,
	<MotorCard key="Motor" />,
	<ButtonCard key="Button" />,
	<ModuleCard key="Module" />,
]

export default function Sensors() {
	return (
		<div className="flex">
			<BentoGrid>
				{features.map((feature, index) => (
					<React.Fragment key={index}>
						{feature}
					</React.Fragment>
				))}
			</BentoGrid>
		</div>
	)
}
