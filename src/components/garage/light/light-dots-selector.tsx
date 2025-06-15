"use client"

import { observer } from "mobx-react"
import { rgbaToHex } from "@uiw/color-convert"
import { cn } from "../../../lib/shadcn/utils"
import { CustomPip } from "../../icons/custom-pip"
import garageClass from "../../../classes/garage-class"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DOT_POSITIONS = [
	{ top: "22px", left: "81px" },     // Top Left
	{ top: "22px", right: "96px" },  // Top Right
	{ top: "52px", left: "51px" }, // Middle Left
	{ top: "52px", right: "66px" }, // Middle Right
	{ bottom: "76px", left: "65px" },      // Bottom Left
	{ bottom: "76px", right: "79px" }        // Bottom Right
]

function LightDotsSelector() {

	return (
		<div className="flex items-start justify-end">
			<div className="relative w-full h-full px-5">
				<CustomPip size={200}/>
				{DOT_POSITIONS.map((position, index) => (
					<button
						key={index}
						onClick={() => garageClass.toggleDot(index)}
						className={cn(
							"absolute w-5 h-5 rounded-sm",
							"transition-all duration-1000",
							garageClass.selectedDots.includes(index) && "animate-pulse"
						)}
						style={{
							backgroundColor: rgbaToHex(garageClass.dotColors[index]) || "#999",
							boxShadow: garageClass.selectedDots.includes(index)
								? `0 0 10px 3px ${rgbaToHex(garageClass.dotColors[index]) || "#999"}`
								: "none",
							transform: "translate(-50%, -50%)",
							...position // Spread the position styles
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default observer(LightDotsSelector)
