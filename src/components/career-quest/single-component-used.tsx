"use client"

import { TvMinimal, Volume2 } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

import { CustomMotor } from "../icons/custom-motor"
import { CustomRuler } from "../icons/custom-ruler"
import { CustomRemote } from "../icons/custom-remote"
import { CustomCompass } from "../icons/custom-compass"
import { CustomPalette } from "../icons/custom-palette"
import { CustomLightbulb } from "../icons/custom-lightbulb"
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

export default function SingleComponentUsed({ component } : { component: ComponentsUsedCareerData }) {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						key={component.componentName}
						className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center \
						hover:bg-emerald-700"
						title={component.componentName}
					>
						{componentIcons[component.componentName]}
					</div>
				</TooltipTrigger>
				<TooltipContent>
					{component.componentName}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
