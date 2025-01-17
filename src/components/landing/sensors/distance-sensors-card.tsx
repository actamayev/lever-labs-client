import { useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import { bentoIconSize } from "../../../utils/constants"
import { CustomRuler } from "../../icons/custom-ruler"

const measureStyles = `
  @keyframes measure {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.5); }
    100% { transform: scaleX(1); }
  }
`

export default function DistanceSensorsCard() {
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = () => {
		setIsAnimating(true)
		// Reset animation state after animation completes
		setTimeout(() => setIsAnimating(false), 1000) // 1000ms = 1s animation duration
	}

	return (
		<>
			<style>{measureStyles}</style>
			<div
				className={cn(
					"group relative flex flex-col justify-between overflow-hidden rounded-xl",
					"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
					"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
					"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
					"row-start-1 row-span-2 col-start-3 col-end-3"
				)}
			>
				<div className="z-10 flex transform-gpu h-full justify-end p-4 gap-6">
					<div className="flex flex-col gap-1">
						<div
							onClick={handleClick}
							className="cursor-pointer"
						>
							<CustomRuler
								className={cn(
									"origin-left text-black dark:text-white",
									isAnimating ? "animate-[measure_1s_ease-in-out]" : ""
								)}
								size={bentoIconSize}
							/>
						</div>
						<div className="flex flex-col">
							<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
								Distance Sensor
							</h3>
							<p className="max-w-lg text-neutral-400">
								Measure distances with millimeter accuracy for smart navigation
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
