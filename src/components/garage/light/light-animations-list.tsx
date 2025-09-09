
"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { LightAnimation } from "@bluedotrobots/common-ts/types/garage"
import { Rainbow, Siren, ChevronDown, Circle } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomYoga } from "../../icons/custom-yoga"
import { buttonVariants } from "../../shadcn/ui/button"
import getGarageClass from "../../../classes/garage-class"
import lightsAnimation from "../../../utils/garage/lights-animation"

interface Animation {
	name: LightAnimation
	description: string
	icon: (color: string) => React.ReactNode
}

const ANIMATIONS: Animation[] = [
	{
		name: "No animation",
		description: "Slowly fades in and out",
		icon: (color: string): React.ReactNode => <Circle className="h-4 w-4" color={color} fill={color} />
	},
	{
		name: "Breathing",
		description: "Slowly fades in and out",
		icon: (color: string): React.ReactNode => <CustomYoga className="h-4 w-4" color={color} fill={color} />
	},
	{
		name: "Rainbow",
		description: "Cycles through colors",
		icon: (): React.ReactNode => <Rainbow className="h-4 w-4" />
	},
	{
		name: "Strobe",
		description: "Strobe light",
		icon: (color: string): React.ReactNode => <Siren className="h-4 w-4" color={color} fill={color} />
	},
	// {
	// 	name: "Snake",
	// 	description: "Snake description",
	// 	icon: <CustomSnake className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	// },
]

function LightAnimationsList(): React.ReactNode {
	const rgbColor = `rgb(${getGarageClass().selectedColorRgba.r}, ${getGarageClass().selectedColorRgba.g}, ${getGarageClass().selectedColorRgba.b})`
	const optimizedLightsAnimation = useCallback(lightsAnimation, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						buttonVariants({
							variant: "outline",
							className: "flex items-center gap-1 rounded-xl justify-between \
								px-4 !py-6 font-medium cursor-pointer w-full border-2 shadow-none !text-xl"
						})
					)}
					style={{ height: "52px" }}
				>
					<span className="flex items-center gap-2">
						<div style={{ color: rgbColor, fill: rgbColor }}>
							{ANIMATIONS.find((anim): boolean => anim.name === getGarageClass().selectedAnimation)?.icon(rgbColor)}
						</div>
						{getGarageClass().selectedAnimation}
					</span>
					<ChevronDown className="!size-6" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-xl bg-standardBackground mt-1 w-72 max-h-44 overflow-y-auto border-2 shadow-none">
				{ANIMATIONS.map((animation): React.ReactNode => (
					<DropdownMenuItem
						key={animation.name}
						onClick={(): Promise<void> => optimizedLightsAnimation(animation.name)}
						className="cursor-pointer transition-none hover:!bg-polar rounded-lg"
					>
						<div className="flex-shrink-0">
							{animation.icon(rgbColor)}
						</div>
						<div className="flex-grow">
							<div className="font-medium text-base">{animation.name}</div>
							<div className="text-xs text-hare">{animation.description}</div>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default observer(LightAnimationsList)
