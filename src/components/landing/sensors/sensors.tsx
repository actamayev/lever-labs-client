/* eslint-disable max-len */
import React from "react"
import LEDCard from "./led-card"
import IMUCard from "./imu-card"
import MotorCard from "./motor-card"
import ButtonCard from "./button-card"
import ModuleCard from "./module-card"
import NumberTicker from "../../shadcn/ui/number-ticker"
import DistanceSensorsCard from "./distance-sensors-card"
import { BentoGrid } from "../../shadcn/ui/custom-bento-grid"

const features: React.ReactNode[] = [
	<LEDCard key={"LED"}/>,
	<IMUCard key={"IMU"}/>,
	<DistanceSensorsCard key={"Distance Sensor"}/>,
	<MotorCard key={"Motor"}/>,
	<ButtonCard key={"Button"}/>,
	<ModuleCard key={"Module"}/>,
]

export default function Sensors() {
	return (
		<div>
			<p
				className="flex justify-center text-center whitespace-pre-wrap text-6xl
				font-medium tracking-tight text-black dark:text-white pt-10 pb-12"
			>
				Pip comes with <NumberTicker className="text-black dark:text-white" value={10} /> onboard sensors
			</p>
			<div className="flex">
				<BentoGrid className="lg:grid-rows-3">
					{features.map((feature, index) => (
						<React.Fragment key={index}>
							{feature}
						</React.Fragment>
					))}
				</BentoGrid>
			</div>
		</div>
	)
}
