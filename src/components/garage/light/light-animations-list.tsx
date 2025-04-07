"use client"

import { observer } from "mobx-react"
import { Rainbow, Siren } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomYoga } from "../../icons/custom-yoga"
import { ScrollArea } from "@/components/shadcn/ui/scroll-area"
import { useGarageContext } from "../../../contexts/garage-context"
import useLightsAnimation from "../../../hooks/garage/lights-animation"

interface Animation {
	id: LightAnimation
	name: string
	description: string
	icon: React.ReactNode
}

// Animation types with icons
const ANIMATIONS: Animation[] = [
	{
		id: "No animation",
		name: "No animation",
		description: "Slowly fades in and out",
		icon: <CustomYoga className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	},
	{
		id: "Breathing",
		name: "Breathing",
		description: "Slowly fades in and out",
		icon: <CustomYoga className="h-4 w-4 text-eel fill-eel" fill="text-eel"/>
	},
	{
		id: "Rainbow",
		name: "Rainbow",
		description: "Cycles through colors",
		icon: <Rainbow className="h-4 w-4" />
	},
	{
		id: "Strobe",
		name: "Strobe",
		description: "Strobe light",
		icon: <Siren className="h-4 w-4" />
	},
]

function LightAnimationsList() {
	const garageClass = useGarageContext()
	const lightsAnimation = useLightsAnimation()

	return (
		<div className="w-full h-full flex flex-col">
			<h3 className="text-sm font-medium mb-2">Animations</h3>
			<ScrollArea className="h-full flex-grow rounded-md border-2 border-swan">
				<div className="p-2 space-y-2">
					{ANIMATIONS.map((animation) => (
						<div
							key={animation.id}
							onClick={() => lightsAnimation(animation.id)}
							className={cn(
								"p-2 rounded-md cursor-pointer text-sm transition-none flex items-center space-x-2",
								garageClass.selectedAnimation === animation.id
									? "bg-swan border-swan border-l-2 border-l-macaw"
									: "hover:bg-swan border-l-transparent border-l-2"
							)}
						>
							<div className="flex-shrink-0 !text-eel">
								{animation.icon}
							</div>
							<div className="flex-grow">
								<div className="font-medium text-questionText">{animation.name}</div>
								<div className="text-xs text-wolf">{animation.description}</div>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default observer(LightAnimationsList)
