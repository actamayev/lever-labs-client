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
import { getDuolingoColors } from "../../utils/duolingo-utils"
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

	const colors = getDuolingoColors(baseColor)

	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					key={component.componentName}
					className={cn(
						"w-10 h-10 rounded-2xl flex items-center justify-center duration-0 border-2 border-white",
						colors.bg2,        // Base background (bg-baseColor-2)
						colors.hoverBg3,    // Hover background (hover:bg-baseColor-3)
						colors.border3
					)}
					title={component.componentName}
				>
					{componentIcons[component.componentName]}
				</div>
			}
			tooltipContent={component.componentName}
		/>
	)
}
