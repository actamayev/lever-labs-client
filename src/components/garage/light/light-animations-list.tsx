/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { Rainbow, Siren, ChevronDown, Circle } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { cn } from "../../../lib/shadcn/utils"
import { CustomYoga } from "../../icons/custom-yoga"
import { buttonVariants } from "../../shadcn/ui/button"
import garageClass from "../../../classes/garage-class"
import useLightsAnimation from "../../../hooks/garage/lights-animation"
import { LightAnimation } from "@bluedotrobots/common-ts"

interface Animation {
	name: LightAnimation
	description: string
	icon: (color: string) => React.ReactNode
}

const ANIMATIONS: Animation[] = [
	{
		name: "No animation",
		description: "Slowly fades in and out",
		icon: (color: string) => <Circle className="h-4 w-4" color={color} fill={color} />
	},
	{
		name: "Breathing",
		description: "Slowly fades in and out",
		icon: (color: string) => <CustomYoga className="h-4 w-4" color={color} fill={color} />
	},
	{
		name: "Rainbow",
		description: "Cycles through colors",
		icon: () => <Rainbow className="h-4 w-4" />
	},
	{
		name: "Strobe",
		description: "Strobe light",
		icon: (color: string) => <Siren className="h-4 w-4" color={color} fill={color} />
	},
	// {
	// 	name: "Snake",
	// 	description: "Snake description",
	// 	icon: <CustomSnake className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	// },
]

function LightAnimationsList() {
	const lightsAnimation = useLightsAnimation()

	const rgbColor = `rgb(${garageClass.selectedColorRgba.r}, ${garageClass.selectedColorRgba.g}, ${garageClass.selectedColorRgba.b})`

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						buttonVariants({
							variant: "outline",
							className: "flex items-center gap-1 rounded-xl justify-between \
								px-4 !py-6 font-medium cursor-pointer w-full border-2 border-swan hover:bg-swan shadow-none !text-xl"
						})
					)}
					style={{ height: "52px" }}
				>
					<span className="flex items-center gap-2">
						<div style={{ color: rgbColor, fill: rgbColor }}>
							{ANIMATIONS.find(anim => anim.name === garageClass.selectedAnimation)?.icon(rgbColor)}
						</div>
						{garageClass.selectedAnimation}
					</span>
					<ChevronDown className="!size-6" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-xl bg-standardBackground mt-1 w-72 max-h-44 overflow-y-auto border-2 shadow-none">
				{ANIMATIONS.map((animation) => (
					<DropdownMenuItem
						key={animation.name}
						onClick={() => lightsAnimation(animation.name)}
						className={cn(
							"my-0.5 p-2 rounded-xl cursor-pointer text-sm transition-none flex items-center space-x-2 hover:!bg-polar",
							garageClass.selectedAnimation === animation.name
								? "!bg-polar border-l-4 border-l-blue-500"
								: "hover:!bg-polar border-l-4 border-l-transparent"
						)}
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
