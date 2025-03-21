"use client"

import { TvMinimal, Volume2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import { CustomMotor } from "../icons/custom-motor"
import { CustomWizardHat } from "../icons/custom-wizard-hat"
import { CustomRuler } from "../icons/custom-ruler"
import { CustomCompass } from "../icons/custom-compass"
import { CustomPalette } from "../icons/custom-palette"

// Map component names to their respective icons
const componentIcons: Record<ComponentName, React.ReactNode> = {
	"Motors + Encoders": <CustomMotor />,
	"Side Distance Sensors": <CustomRuler />,
	"Multizone Distance Sensor": <CustomWizardHat />,
	"IMU": <CustomCompass />,
	"LED": <CustomLightbulb />,
	"Speaker": <Volume2 />,
	"IR Sensors": <CustomWizardHat />,
	"Color Sensor": <CustomPalette />,
	"Screen": <TvMinimal />
}

export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const { careerName, backgroundUrl, percentComplete, componentsUsed, careerUrl } = careerData

	// Format completion status
	let completionStatus = `${percentComplete}% Completed`
	if (percentComplete === 0) completionStatus = "Not Started"
	if (percentComplete === 100) completionStatus = "Completed"

	return (
		<Link href={careerUrl}>
			<div className="relative overflow-hidden shadow-md rounded-2xl w-full h-64 cursor-pointer">
				{/* Background Image with Gradient Blur */}
				<div className="absolute inset-0">
					<Image
						src={backgroundUrl}
						alt={careerName}
						fill
						style={{ objectFit: "cover" }}
						className="z-0"
					/>
					{/* Gradient overlay that gets more opaque toward bottom */}
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-10"></div>
				</div>

				{/* Content Container */}
				<div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
					{/* Component Icons Row */}
					<div className="flex flex-wrap gap-2 mb-3">
						{componentsUsed.map((component, index) => (
							<div
								key={`${component.componentName}-${index}`}
								className="w-8 h-8 bg-gray-800/70 rounded-full flex items-center justify-center"
								title={component.componentName}
							>
								{componentIcons[component.componentName]}
							</div>
						))}
					</div>

					{/* Title and Completion Row */}
					<div className="flex justify-between items-center">
						<h3 className="text-xl font-semibold">{careerName}</h3>
						<span className="text-sm bg-black/40 px-3 py-1 rounded-full">
							{completionStatus}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
