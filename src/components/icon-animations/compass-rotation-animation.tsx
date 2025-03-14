import { useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import { CustomCompass } from "../icons/custom-compass"

const animationStyles = `
  @keyframes compass-wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-20deg); }
    75% { transform: rotate(20deg); }
  }

  .animate-compass-wobble {
    animation: compass-wobble 2s ease-in-out infinite;
  }
`

export default function CompassRotationAnimation({ iconSize } : { iconSize: number }) {
	const [isAnimating, setIsAnimating] = useState(false)

	return (
		<>
			<style>{animationStyles}</style>
			<div
				className="w-fit group"
				onMouseEnter={() => setIsAnimating(true)}
				onMouseLeave={() => setIsAnimating(false)}
			>
				<CustomCompass
					className={cn(
						"origin-center text-questionText transform",
						isAnimating ? "animate-compass-wobble" : ""
					)}
					size={iconSize}
				/>
			</div>
		</>
	)
}
