"use client"

import { observer } from "mobx-react"
import { useGarageContext } from "../../contexts/garage-context"

// Define dot positions
// eslint-disable-next-line @typescript-eslint/naming-convention
const DOT_POSITIONS = [
	"top-0 left-0",         // Top Left
	"top-0 right-0",        // Top Right
	"top-1/2 -translate-y-1/2 left-0", // Middle Left
	"top-1/2 -translate-y-1/2 right-0", // Middle Right
	"bottom-0 left-0",      // Bottom Left
	"bottom-0 right-0",     // Bottom Right
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
						className={`absolute ${position} w-4 h-4 rounded-full transform -translate-x-1/2
						-translate-y-1/2 transition-all duration-200 ${
					garageClass.selectedDots.includes(index)
						? "ring-2 ring-offset-1 ring-blue-500"
						: ""
					}`}
						style={{
							backgroundColor: garageClass.dotColors[index] || "#999",
							boxShadow: garageClass.selectedDots.includes(index)
								? "0 0 8px rgba(59, 130, 246, 0.6)"
								: "none"
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default observer(LightDotsSelector)
