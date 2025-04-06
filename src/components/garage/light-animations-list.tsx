"use client"

import { observer } from "mobx-react"
import { useGarageContext } from "../../contexts/garage-context"

interface Animation {
	id: LightAnimation
	name: string
	description: string
}

// Animation types
const ANIMATIONS: Animation[] = [
	{ id: "static", name: "Static Light", description: "Solid color with no animation" },
	{ id: "breathing", name: "Breathing", description: "Slowly fades in and out" },
	{ id: "pulse", name: "Pulse", description: "Quick pulse effect" },
	{ id: "strobe", name: "Strobe", description: "Rapid flashing effect" },
	{ id: "rainbow", name: "Rainbow", description: "Cycles through colors" },
	{ id: "wave", name: "Wave", description: "Color waves across selected lights" },
]

function LightAnimationsList() {
	const garageClass = useGarageContext()

	return (
		<div className="w-full">
			<h3 className="text-sm font-medium mb-2">Light Animations</h3>
			<div className="max-h-24 overflow-y-auto pr-1 space-y-1">
				{ANIMATIONS.map((animation) => (
					<div
						key={animation.id}
						onClick={() => garageClass.setSelectedAnimation(animation.id)}
						className={`p-2 rounded-md cursor-pointer text-sm transition-colors ${
							garageClass.selectedAnimation === animation.id
								? "bg-blue-100 border-l-4 border-blue-500"
								: "hover:bg-gray-100"
						}`}
					>
						<div className="font-medium">{animation.name}</div>
						<div className="text-xs text-gray-500">{animation.description}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(LightAnimationsList)
