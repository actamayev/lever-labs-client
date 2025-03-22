"use client"

import { cn } from "@/lib/shadcn/utils"
import { bentoIconSize } from "../../../utils/constants"
import RulerExpansionAnimation from "../../icon-animations/ruler-expansion-animation"
import { landingSensorCardHeaderText, landingSensorCardText } from "../../../utils/text-styles"

export default function DistanceSensorsCard() {
	return (
		<div className={cn(
			"group relative flex flex-col justify-between overflow-hidden rounded-xl",
			"bg-standardBackground [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			"transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)]",
			"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			"col-span-1 md:col-span-2 lg:col-span-1",
			"lg:col-start-3 lg:row-span-2"
		)}>
			{/* Mobile layout (horizontal) */}
			<div className="md:hidden z-10 flex flex-row transform-gpu h-full p-3 gap-3">
				<div className="shrink-0 flex justify-center items-center">
					<RulerExpansionAnimation iconSize={bentoIconSize} />
				</div>
				<div className="flex flex-col justify-center flex-1">
					<h3 className={landingSensorCardHeaderText()}>
						3 Distance Sensors
					</h3>
					<p className={landingSensorCardText()}>
						Measure distances with millimeter accuracy
					</p>
				</div>
			</div>

			{/* Desktop layout (vertical) */}
			<div className="hidden md:flex z-10 transform-gpu h-full p-4 gap-6">
				<div className="flex flex-col gap-1 w-full items-center md:items-start">
					<div className="flex justify-center md:justify-start w-full">
						<RulerExpansionAnimation iconSize={bentoIconSize} />
					</div>
					<div className="flex flex-col items-center md:items-start text-center md:text-left">
						<h3 className={landingSensorCardHeaderText()}>
							3 Distance Sensors
						</h3>
						<p className={landingSensorCardText()}>
							Measure distances with millimeter accuracy for smart navigation
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
