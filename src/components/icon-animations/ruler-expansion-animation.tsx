import { useCallback, useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import { CustomRuler } from "../icons/custom-ruler"

const measureStyles = `
  @keyframes measure {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.5); }
    100% { transform: scaleX(1); }
  }
`

export default function RulerExpansionAnimation({ iconSize } : { iconSize: number }) {
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = useCallback(() => {
		setIsAnimating(true)
		// Reset animation state after animation completes
		setTimeout(() => setIsAnimating(false), 1000) // 1000ms = 1s animation duration
	}, [])

	return (
		<>
			<style>{measureStyles}</style>
			<div
				onClick={handleClick}
				className="cursor-pointer"
			>
				<CustomRuler
					className={cn(
						"origin-left text-black dark:text-white",
						isAnimating ? "animate-[measure_1s_ease-in-out]" : ""
					)}
					size={iconSize}
				/>
			</div>
		</>
	)
}
