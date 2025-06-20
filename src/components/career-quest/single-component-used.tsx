"use client"

import { TvMinimal, Volume2 } from "lucide-react"

import { cn } from "../../lib/shadcn/utils"
import CustomTooltip from "../custom-tooltip"
import { CustomMotor } from "../icons/custom-motor"
import { CustomRuler } from "../icons/custom-ruler"
import { CustomRemote } from "../icons/custom-remote"
import { CustomCompass } from "../icons/custom-compass"
import { CustomPalette } from "../icons/custom-palette"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import { getDuolingoColorVariant } from "../../utils/duolingo-utils"
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

interface Props {
	component: ComponentsUsedCareerData
	baseColor: DuolingoColors
}

export default function SingleComponentUsed(props: Props) {
	const { component, baseColor } = props

	const bgColorClass = getDuolingoColorVariant(baseColor, "bg", 2)

	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					key={component.componentName}
					className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", bgColorClass)}
					title={component.componentName}
				>
					{componentIcons[component.componentName]}
				</div>
			}
			tooltipContent={component.componentName}
		/>
	)
}
