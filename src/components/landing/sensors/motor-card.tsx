import { useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import "../../../styles/motor-spin.css"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { CustomWheel } from "../../icons/custom-wheel"

export default function MotorCard() {
	const [isSpinning, setIsSpinning] = useState(false)

	return (
		<SensorsSkeleton
			title="2× Dual Hall Effect Encoders + Motors"
			description="Motors with precise position tracking for controlled movement"
			icon={
				<div
					className="pointer-events-auto w-fit"
					onMouseEnter={() => setIsSpinning(true)}
					onMouseLeave={() => setIsSpinning(false)}
				>
					<CustomWheel
						className={cn(
							"origin-center text-black dark:text-white",
							isSpinning && "spin-wheel"
						)}
						size={bentoIconSize}
					/>
				</div>
			}
			outerDivStyles="row-start-2 col-start-1 col-span-2"
			paragraphStyles="whitespace-nowrap"
		/>
	)
}
