"use client"

import { observer } from "mobx-react"
import { useGarageContext } from "../../../contexts/garage-context"
import { cn } from "../../../lib/shadcn/utils"

// Define dot positions
// eslint-disable-next-line @typescript-eslint/naming-convention
const DOT_POSITIONS = [
	"top-2 left-10",         // Top Left
	"top-2 right-8",        // Top Right
	"top-1/4 -translate-y-1/2 left-3", // Middle Left
	"top-1/4 -translate-y-1/2 right-3", // Middle Right
	"bottom-0 left-10",      // Bottom Left
	"bottom-0 right-8",     // Bottom Right
]

function LightDotsSelector() {
	const garageClass = useGarageContext()

	return (
		<div className="relative w-32 h-32 border border-hare rounded-md">
			{/* The square container */}
			<div className="w-full h-full bg-polar rounded-md">
				{/* Dots positioned around the square */}
				{DOT_POSITIONS.map((position, index) => (
					<button
						key={index}
						onClick={() => garageClass.toggleDot(index)}
						className={cn(
							"absolute w-4 h-4 rounded-full transform -translate-x-1/2",
							position,
							"-translate-y-1/2 transition-all duration-1000",
							garageClass.selectedDots.includes(index) && "animate-pulse"
						)}
						style={{
							backgroundColor: garageClass.dotColors[index] || "#999",
							boxShadow: garageClass.selectedDots.includes(index)
								? `0 0 10px 3px ${garageClass.dotColors[index] || "#999"}`
								: "none"
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default observer(LightDotsSelector)
