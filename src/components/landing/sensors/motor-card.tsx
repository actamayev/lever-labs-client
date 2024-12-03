import { useState } from "react"
import { GiCarWheel } from "react-icons/gi"
import { cn } from "@/lib/shadcn/utils"
import "../../../styles/motor-spin.css"
import { bentoIconSize } from "../../../utils/constants"

export default function MotorCard() {
	const [isSpinning, setIsSpinning] = useState(false)

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-2 col-start-1 col-span-2"
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu gap-6 p-4 items-center">
				<div
					className="pointer-events-auto w-fit cursor-pointer"
					onMouseEnter={() => setIsSpinning(true)}
					onMouseLeave={() => setIsSpinning(false)}
				>
					<GiCarWheel
						className={cn(
							"origin-center text-black dark:text-white",
							isSpinning && "spin-wheel"
						)}
						size={bentoIconSize}
					/>
				</div>
				<div className="flex flex-col">
					<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
					2× Dual Hall Effect Encoders + Motors
					</h3>
					<p className="max-w-lg text-neutral-400 whitespace-nowrap">
					98RPM motors with precise position tracking for controlled movement
					</p>
				</div>
			</div>
		</div>
	)
}
