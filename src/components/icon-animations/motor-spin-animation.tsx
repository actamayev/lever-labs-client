"use client"

import { useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import { CustomWheel } from "../icons/custom-wheel"

const animationStyles = `
	.spin-wheel {
		animation: spin 0.2s linear infinite;
	}
	
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`

export default function MotorSpinAnimation({ iconSize } : { iconSize: number }): React.ReactNode {
	const [isSpinning, setIsSpinning] = useState(false)

	return (
		<>
			<style>{animationStyles}</style>
			<div
				className="pointer-events-auto w-fit"
				onMouseEnter={(): void => setIsSpinning(true)}
				onMouseLeave={(): void => setIsSpinning(false)}
			>
				<CustomWheel
					className={cn(
						"origin-center text-questionText",
						isSpinning && "spin-wheel"
					)}
					size={iconSize}
				/>
			</div>
		</>
	)
}
