import { TbRulerMeasure } from "react-icons/tb"
import { cn } from "@/lib/shadcn/utils"
import { bentoIconSize } from "../../../utils/constants"

export default function DistanceSensorsCard() {
	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-1 row-span-2 col-start-3 col-end-3"
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu h-full justify-end p-4">
				<div className="flex flex-col gap-1">
					<TbRulerMeasure
						className="origin-left transition-all duration-300 cursor-pointer"
						size={bentoIconSize}
					/>
					<div className="flex flex-col">
						<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
						2× Time of Flight Sensors (VL53L5CX)
						</h3>
						<p className="max-w-lg text-neutral-400">
						Measure distances with millimeter accuracy for precise navigation
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
