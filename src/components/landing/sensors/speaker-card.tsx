import { useState, useEffect } from "react"
import { Volume1, Volume2, Volume } from "lucide-react"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"

export default function SpeakerCard() {
	const [isHovered, setIsHovered] = useState(false)
	const [volumeLevel, setVolumeLevel] = useState(2) // Start with Volume2

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isHovered) {
			// Start cycling through volume levels with a 1-second interval
			interval = setInterval(() => {
				setVolumeLevel((prev) => (prev % 3) + 1) // Cycle through 1, 2, 3
			}, 333)
		} else {
			// Reset to Volume2 when not hovered
			setVolumeLevel(2)

			// Clear the interval when hover ends
			if (interval) {
				clearInterval(interval)
			}
		}

		// Clean up the interval on component unmount
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isHovered])

	const SpeakerIcon = () => {
		return (
			<div
				className="relative"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{volumeLevel === 1 && (
					<Volume1
						size={bentoIconSize}
						className="transition-opacity duration-300"
					/>
				)}
				{volumeLevel === 2 && (
					<Volume2
						size={bentoIconSize}
						className="transition-opacity duration-300"
					/>
				)}
				{volumeLevel === 3 && (
					<Volume
						size={bentoIconSize}
						className="transition-opacity duration-300"
					/>
				)}
			</div>
		)
	}

	return (
		<SensorsSkeleton
			title="Built-in Speaker"
			description="Play sounds, music, and voice feedback for interactive experiences"
			icon={<SpeakerIcon />}
			outerDivStyles="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3"
		/>
	)
}
