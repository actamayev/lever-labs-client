"use client"

import { observer } from "mobx-react"
import { Rainbow, Siren, ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { cn } from "../../../lib/shadcn/utils"
import { CustomYoga } from "../../icons/custom-yoga"
import { CustomSnake } from "../../icons/custom-snake"
import { useGarageContext } from "../../../contexts/garage-context"
import useLightsAnimation from "../../../hooks/garage/lights-animation"

interface Animation {
	name: LightAnimation
	description: string
	icon: React.ReactNode
}

const ANIMATIONS: Animation[] = [
	{
		name: "No animation",
		description: "Slowly fades in and out",
		icon: <CustomYoga className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	},
	{
		name: "Breathing",
		description: "Slowly fades in and out",
		icon: <CustomYoga className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	},
	{
		name: "Rainbow",
		description: "Cycles through colors",
		icon: <Rainbow className="h-4 w-4" />
	},
	{
		name: "Strobe",
		description: "Strobe light",
		icon: <Siren className="h-4 w-4" />
	},
	{
		name: "Snake",
		description: "Snake description",
		icon: <CustomSnake className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	},
]

function LightAnimationsList() {
	const garageClass = useGarageContext()
	const lightsAnimation = useLightsAnimation()

	return (
		<div className="w-full h-full flex flex-col">
			<h3 className="text-sm font-medium mb-2 text-gray-700">Animations</h3>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className={cn(
							"flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700",
							"bg-white border border-gray-200 rounded-xl shadow-sm",
							"hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
							"transition-all duration-200 ease-in-out"
						)}
					>
						<span className="flex items-center gap-2">
							{/* Display the icon of the selected animation */}
							{ANIMATIONS.find(anim => anim.name === garageClass.selectedAnimation)?.icon}
							{garageClass.selectedAnimation}
						</span>
						<ChevronDown className="h-4 w-4 text-gray-500" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="rounded-xl bg-white shadow-lg border border-gray-100 mt-1 w-64"
				>
					{ANIMATIONS.map((animation) => (
						<DropdownMenuItem
							key={animation.name}
							onClick={() => lightsAnimation(animation.name)}
							className={cn(
								"p-2 rounded-md cursor-pointer text-sm transition-none flex items-center space-x-2",
								garageClass.selectedAnimation === animation.name
									? "bg-blue-50 border-l-4 border-l-blue-500 text-blue-700"
									: "hover:bg-gray-50 border-l-4 border-l-transparent text-gray-700"
							)}
						>
							<div className="flex-shrink-0 text-gray-500">
								{animation.icon}
							</div>
							<div className="flex-grow">
								<div className="font-medium">{animation.name}</div>
								<div className="text-xs text-gray-500">{animation.description}</div>
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default observer(LightAnimationsList)
