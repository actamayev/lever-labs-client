import { Card, CardContent } from "../../shadcn/ui/card"
import React from "react"
import LEDCard from "./led-card"
import IMUCard from "./imu-card"
import MotorCard from "./motor-card"
import ButtonCard from "./button-card"
import ModuleCard from "./module-card"
import ScreenCard from "./screen-card"
import SpeakerCard from "./speaker-card"
import DistanceSensorsCard from "./distance-sensors-card"
import { BentoGrid } from "../../shadcn/ui/bento-grid"
import LandingSectionHeaderText from "../landing-section-header-text"

const features: React.ReactNode[] = [
	<LEDCard key="LED"/>,
	<IMUCard key="IMU" />,
	<DistanceSensorsCard key="Distance Sensor" />,
	<MotorCard key="Motor" />,
	<ButtonCard key="Button" />,
	<ModuleCard key="Module" />,
	<ScreenCard key="Screen"/>,
	<SpeakerCard key="Speaker"/>
]

export default function LandingSensors() {
	return (
		<div className="w-full">
			<LandingSectionHeaderText text="Pip's sensor suite"/>

			{/* Add responsive padding-top to the Card */}
			<Card className="h-full flex flex-col bg-standardBackground mt-4 sm:mt-6 md:mt-8 pt-2 sm:pt-3 md:pt-4 lg:pt-6">
				<CardContent className="flex-1 px-2 xs:px-3 sm:px-5 md:px-6">
					<div className="w-full">
						<div className="w-full h-full">
							<BentoGrid className="gap-2 sm:gap-3 md:gap-4">
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
		</div>
	)
}
