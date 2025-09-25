"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/shadcn/utils"
import { CustomRuler } from "../../icons/custom-ruler"

const measureStyles = `
  @keyframes measure {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.5); }
    100% { transform: scaleX(1); }
  }
`

export default function RulerExpansionAnimation({ iconSize }: { iconSize: number }): React.ReactNode {
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = useCallback((): void => {
		setIsAnimating(true)
		setTimeout((): void => setIsAnimating(false), 1000)
	}, [])

	return (
		<>
			<style>{measureStyles}</style>
			<CustomRuler
				onClick={handleClick}
				className={cn(
					"origin-left text-questionText cursor-pointer",
					isAnimating ? "animate-[measure_1s_ease-in-out]" : ""
				)}
				size={iconSize}
			/>
		</>
	)
}
