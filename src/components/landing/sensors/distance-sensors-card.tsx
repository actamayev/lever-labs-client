import { cn } from "@/lib/shadcn/utils"
import { bentoIconSize } from "../../../utils/constants"
import RulerExpansionAnimation from "../../icon-animations/ruler-expansion-animation"

export default function DistanceSensorsCard() {
	return (
		<div className={cn(
			"group relative flex flex-col justify-between overflow-hidden rounded-xl",
			"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
			"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			"col-span-1 md:col-span-2 lg:col-span-1",
			"lg:col-start-3 lg:row-span-2"
		)}>
			<div className="z-10 flex transform-gpu h-full justify-end p-4 gap-6">
				<div className="flex flex-col gap-1">
					<RulerExpansionAnimation iconSize={bentoIconSize} />
					<div className="flex flex-col">
						<h3 className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                            Distance Sensor
						</h3>
						<p className="text-sm md:text-base text-neutral-400">
                            Measure distances with millimeter accuracy for smart navigation
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
