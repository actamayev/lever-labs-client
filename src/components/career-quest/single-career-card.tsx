/* eslint-disable max-len */
"use client"

import { TvMinimal, Volume2 } from "lucide-react"
import { CustomMotor } from "../icons/custom-motor"
import { CustomRuler } from "../icons/custom-ruler"
import { CustomRemote } from "../icons/custom-remote"
import { CustomCompass } from "../icons/custom-compass"
import { CustomPalette } from "../icons/custom-palette"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { CustomMultizoneDistanceSensor } from "../icons/custom-multizone-distance-sensor"

const componentIcons: Record<ComponentName, React.ReactNode> = {
	"Motors + Encoders": <CustomMotor />,
	"Side Distance Sensors": <CustomRuler />,
	"Multizone Distance Sensor": <CustomMultizoneDistanceSensor />,
	"IMU": <CustomCompass />,
	"LED": <CustomLightbulb />,
	"Speaker": <Volume2 />,
	"IR Sensors": <CustomRemote />,
	"Color Sensor": <CustomPalette />,
	"Screen": <TvMinimal />
}

export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon, totalLessons, lessonsComplete } = careerData
	const navigate = useTypedNavigate()

	return (
		<div className="relative overflow-hidden rounded-2xl bg-emerald-500 text-white w-[600px] h-[261px] flex">
			{/* Left Section */}
			<div className="w-1/2 flex flex-col p-6 justify-between">
				{/* Title */}
				<h3 className="text-2xl font-bold">{careerName}</h3>

				{/* Progress Bar */}
				<div className="flex items-center">
					<div className="h-4 flex-grow rounded-full bg-emerald-600 relative">
						<div
							className="h-full rounded-full bg-emerald-300"
							style={{ width: `${(lessonsComplete + 1 / totalLessons) * 100}%` }}
						/>
					</div>
					<div className="ml-3 flex items-center">
						<span className="text-sm font-medium">{lessonsComplete} / {totalLessons}</span>
					</div>
				</div>

				{/* Component Icons */}
				<div className="flex flex-wrap gap-2 my-4">
					{componentsUsed.slice(0, 4).map((component, index) => (
						<div
							key={`${component.componentName}-${index}`}
							className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center"
							title={component.componentName}
						>
							{componentIcons[component.componentName]}
						</div>
					))}
					{componentsUsed.length > 4 && (
						<div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
							<span className="font-bold">+{componentsUsed.length - 3}</span>
						</div>
					)}
				</div>

				{/* Continue Button */}
				<TactileButton
					className="duration-0 text-emerald-600 bg-white hover:bg-[rgb(230,230,230)] h-12 rounded-2xl text-base"
					onClick={() => navigate(careerUrl)}
					shadowColor="rgb(178,214,201)"
				>
					{lessonsComplete === 0 ? "START" : "CONTINUE"}

				</TactileButton>
			</div>

			{/* Right Section with Image */}
			<div className="w-1/2 flex items-center justify-center !text-white">
				<Icon size={200} />
			</div>
		</div>
	)
}
