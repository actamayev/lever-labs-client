import { useCallback, useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import { CustomCompass } from "../icons/custom-compass"

type AnimationKey = "spin" | "wobble" | "finder"

const animations: Record<AnimationKey, string> = {
	spin: "animate-[spin_3s_linear_infinite]",
	wobble: "animate-[wobble_2s_ease-in-out_infinite]",
	finder: "animate-[finder_4s_ease-in-out_infinite]"
} as const

const animationStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-20deg); }
    75% { transform: rotate(20deg); }
  }

  @keyframes finder {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(90deg); }
    50% { transform: rotate(180deg); }
    75% { transform: rotate(270deg); }
    100% { transform: rotate(360deg); }
    from { transform-origin: center; }
    to { transform-origin: center; }
  }
`

export default function CompassRotationAnimation({ iconSize } : { iconSize: number }) {
	const [currentAnimation, setCurrentAnimation] = useState("")

	const getRandomAnimation = useCallback(() => {
		const animationKeys = Object.keys(animations) as AnimationKey[]
		const randomIndex = Math.floor(Math.random() * animationKeys.length)
		return animations[animationKeys[randomIndex]]
	}, [])

	return (
		<>
			<style>{animationStyles}</style>
			<div
				className="w-fit group"
				onMouseEnter={() => setCurrentAnimation(getRandomAnimation())}
				onMouseLeave={() => setCurrentAnimation("")}
			>
				<CustomCompass
					className={cn(
						"origin-center text-black dark:text-white transform",
						currentAnimation
					)}
					size={iconSize}
				/>
			</div>
		</>

	)
}
