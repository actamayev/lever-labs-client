
"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { LightAnimation } from "@lever-labs/common-ts/types/garage"
import { Rainbow, Siren, ChevronDown, Circle } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomYoga } from "../../../icons/custom-yoga"
import { buttonVariants } from "../../shadcn/ui/button"
import garageClass from "../../../classes/garage-class"
import lightsAnimation from "../../../utils/garage/lights-animation"
import CustomTooltip from "../../custom-tooltip"

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
	const rgbColor = `rgb(${garageClass.selectedColorRgba.r}, ${garageClass.selectedColorRgba.g}, ${garageClass.selectedColorRgba.b})`
	const optimizedLightsAnimation = useCallback(lightsAnimation, [])
	const isDisabled = !garageClass.garageLightsStatus

	const trigger = (
		<div
			className={cn(
				buttonVariants({
					variant: "outline",
					className: cn(
						"flex items-center gap-1 rounded-xl justify-between",
						"px-4 py-6! font-medium w-full border-2 shadow-none text-xl!",
						isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
					)
				})
			)}
			style={{ height: "52px" }}
		>
			<span className="flex items-center gap-2">
				<div style={{ color: rgbColor, fill: rgbColor }}>
					{ANIMATIONS.find((anim): boolean => anim.name === garageClass.selectedAnimation)?.icon(rgbColor)}
				</div>
				{garageClass.selectedAnimation}
			</span>
			<ChevronDown className="size-6!" />
		</div>
	)

	const menu = (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{trigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-xl bg-standard-background mt-1 w-72 max-h-44 overflow-y-auto border-2 shadow-none">
				{ANIMATIONS.map((animation): React.ReactNode => (
					<DropdownMenuItem
						key={animation.name}
						onClick={(): Promise<void> => (!isDisabled ? optimizedLightsAnimation(animation.name) : Promise.resolve())}
						className={cn(
							"transition-none hover:bg-polar! rounded-lg",
							isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
						)}
					>
						<div className="shrink-0">
							{animation.icon(rgbColor)}
						</div>
						<div className="grow">
							<div className="font-medium text-base">{animation.name}</div>
							<div className="text-xs text-hare">{animation.description}</div>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)

	return !isDisabled ? ( menu ) : (
		<CustomTooltip
			tooltipTrigger={
				<div className="relative w-full">
					{menu}
					<div className="absolute inset-0 cursor-not-allowed" />
				</div>
			}
			tooltipContent="Lights disabled by teacher"
		/>
	)
}

export default observer(LightAnimationsList)
