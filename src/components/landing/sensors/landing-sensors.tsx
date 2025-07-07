"use client"

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
import LandingSectionHeaderText from "../landing-section-header-text"
import ColorSensorCard from "./color-sensor-card"
import IRSensorCard from "./ir-sensor-card"

// Order of components in this array determines mobile display order
const features: React.ReactNode[] = [
	<MotorCard key="Motor" />,
	<LEDCard key="LED" />,
	<ButtonCard key="Button" />,
	<SpeakerCard key="Speaker" />,
	<ScreenCard key="Screen" />,
	<ColorSensorCard key="Color Sensor" />,
	<IRSensorCard key="IR Sensors" />,
	<IMUCard key="IMU" />,
	<DistanceSensorsCard key="Distance Sensor" />,
	<ModuleCard key="Module" />
]

export default function LandingSensors() {
	return (
		<div className="w-full">
			<LandingSectionHeaderText text="Pip's sensor suite" />

			{/* Mobile layout (below sm) - simple stacking for mobile */}
			<div className="block sm:hidden">
				<div className="w-full h-full pt-4 px-3">
					<div className="flex flex-col gap-3">
						{features.map((feature, index) => (
							<div key={index}>{feature}</div>
						))}
					</div>
				</div>
			</div>

			{/* Larger screens (sm and up) - grid layout */}
			<div className="hidden sm:block">
				<Card className="h-full flex flex-col bg-standardBackground mt-4 sm:mt-6 md:mt-8 pt-2 sm:pt-3 md:pt-4 lg:pt-6 shadow-md">
					<CardContent className="flex-1 px-2 xs:px-3 sm:px-5 md:px-6">
						<div className="w-full">
							<div className="w-full h-full">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
									{features.map((feature, index) => (
										<React.Fragment key={index}>{feature}</React.Fragment>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
