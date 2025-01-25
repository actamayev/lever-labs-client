import { useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import "../../styles/motor-spin.css"
import { CustomWheel } from "../icons/custom-wheel"

export default function MotorSpinAnimation({ iconSize } : { iconSize: number }) {
	const [isSpinning, setIsSpinning] = useState(false)

	return (
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
				size={iconSize}
			/>
		</div>
	)
}
