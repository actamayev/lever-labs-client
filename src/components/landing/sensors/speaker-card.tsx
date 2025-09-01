"use client"

import { useState, useEffect, useRef } from "react"
import { Volume1, Volume2, Volume } from "lucide-react"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants/constants"

export default function SpeakerCard(): React.ReactNode {
	const [isHovered, setIsHovered] = useState(false)
	const [volumeLevel, setVolumeLevel] = useState(2) // Start with Volume2
	const speakerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isHovered) {
			// Start cycling through volume levels
			interval = setInterval(() => {
				setVolumeLevel((prev) => (prev % 3) + 1) // Cycle through 1, 2, 3
			}, 333)
		} else {
			// Reset to Volume2 when not hovered
			setVolumeLevel(2)

			// Clear the interval

			if (interval) {
				clearInterval(interval)
			}
		}

		// Add global click/touch handler to detect interactions outside component
		const handleGlobalClick = (e: MouseEvent | TouchEvent): void => {
			if (speakerRef.current && !speakerRef.current.contains(e.target as Node)) {
				setIsHovered(false)
			}
		}

		// Add scroll handler to stop animation when scrolling
		const handleScroll = (): void => {
			setIsHovered(false)
		}

		// Add event listeners
		document.addEventListener("click", handleGlobalClick)
		document.addEventListener("touchstart", handleGlobalClick)
		window.addEventListener("scroll", handleScroll)

		// Clean up event listeners
		return (): void => {
			if (interval) {
				clearInterval(interval)
			}
			document.removeEventListener("click", handleGlobalClick)
			document.removeEventListener("touchstart", handleGlobalClick)
			window.removeEventListener("scroll", handleScroll)
		}
	}, [isHovered])

	const SpeakerIcon = (): React.ReactNode => {
		return (
			<div
				ref={speakerRef}
				className="relative text-questionText"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => setIsHovered(!isHovered)} // Toggle for mobile
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
			title="Speaker"
			description="Plays sounds, music, and voice feedback for interactive experiences"
			icon={<SpeakerIcon />}
			outerDivStyles="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3"
		/>
	)
}
