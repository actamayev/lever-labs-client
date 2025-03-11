import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import React from "react"
import LEDCard from "./led-card"
import IMUCard from "./imu-card"
import MotorCard from "./motor-card"
import ButtonCard from "./button-card"
import ModuleCard from "./module-card"
import DistanceSensorsCard from "./distance-sensors-card"
import { BentoGrid } from "../../shadcn/ui/bento-grid"

const features: React.ReactNode[] = [
	<LEDCard key="LED"/>,
	<IMUCard key="IMU" />,
	<DistanceSensorsCard key="Distance Sensor" />,
	<MotorCard key="Motor" />,
	<ButtonCard key="Button" />,
	<ModuleCard key="Module" />
]
export default function LandingSensors() {
	return (
		<Card className="h-full flex flex-col bg-standardBackground">
			<CardHeader className="p-4 lg:p-6 flex-shrink-0">
				<CardTitle className="text-xl lg:text-2xl">Pip's full sensor suite</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="w-full h-full">
					<div className="w-full">
						<BentoGrid>
							{features.map((feature, index) => (
								<React.Fragment key={index}>
									{feature}
								</React.Fragment>
							))}
						</BentoGrid>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
