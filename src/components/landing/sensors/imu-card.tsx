import { cn } from "@/lib/shadcn/utils"
import { FaTachometerAlt } from "react-icons/fa"
import { bentoIconSize } from "../../../utils/constants"

// TODO: BNO085 should only appear as a tooltip on hover on imu
export default function IMUCard() {
	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-1 col-start-2 col-end-2"
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu gap-6 p-4 items-center">
				<div className="w-fit">
					<FaTachometerAlt
						className="origin-left transition-all duration-300 text-black dark:text-white"
						size={bentoIconSize}
					/>
				</div>
				<div className="flex flex-col">
					<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
						9-Axis IMU (BNO085)
					</h3>
					<p className="max-w-lg text-neutral-400">
						Track orientation, acceleration, and motion with precision
					</p>
				</div>
			</div>
		</div>
	)
}
