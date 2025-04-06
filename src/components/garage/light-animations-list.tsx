"use client"

import { observer } from "mobx-react"
import { useGarageContext } from "../../contexts/garage-context"
import { ScrollArea } from "@/components/shadcn/ui/scroll-area"
import { Waves, Rainbow } from "lucide-react"
import { CustomYoga } from "../icons/custom-yoga"

// Define animation type with icon property
type LightAnimation = "static" | "breathing" | "pulse" | "strobe" | "rainbow" | "wave"

interface Animation {
	id: LightAnimation
	name: string
	description: string
	icon: React.ReactNode
}

// Animation types with icons
const ANIMATIONS: Animation[] = [
	{
		id: "breathing",
		name: "Breathing",
		description: "Slowly fades in and out",
		icon: <CustomYoga className="h-4 w-4" />
	},
	{
		id: "rainbow",
		name: "Rainbow",
		description: "Cycles through colors",
		icon: <Rainbow className="h-4 w-4" />
	},
	{
		id: "wave",
		name: "Wave",
		description: "Color waves across selected lights",
		icon: <Waves className="h-4 w-4" />
	},
]

function LightAnimationsList() {
	const garageClass = useGarageContext()

	return (
		<div className="w-full h-full flex flex-col">
			<h3 className="text-sm font-medium mb-2">Light Animations</h3>
			<ScrollArea className="h-full flex-grow rounded-md border border-hare">
				<div className="p-2 space-y-2">
					{ANIMATIONS.map((animation) => (
						<div
							key={animation.id}
							onClick={() => garageClass.setSelectedAnimation(animation.id)}
							className={`p-2 rounded-md cursor-pointer text-sm transition-colors flex items-center space-x-2 ${
								garageClass.selectedAnimation === animation.id
									? "bg-blue-100 border-l-4 border-blue-500"
									: "hover:bg-polar"
							}`}
						>
							<div className="flex-shrink-0 text-swan">
								{animation.icon}
							</div>
							<div className="flex-grow">
								<div className="font-medium">{animation.name}</div>
								<div className="text-xs text-gray-500">{animation.description}</div>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default observer(LightAnimationsList)
