"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

export interface ArcadeGameCardProps {
	/** Background image URL or path */
	backgroundImage: string
	/** Game icon component or image URL */
	gameIcon: React.ReactNode | string
	/** Name of the game */
	gameName: string
	/** Description of the game */
	description: string
	/** Callback when play button is clicked */
	onPlay?: () => void
	/** Optional className for custom styling */
	className?: string
	/** Optional href for navigation */
	href?: string
}

// eslint-disable-next-line max-lines-per-function
export function ArcadeGameCard({
	backgroundImage,
	gameIcon,
	gameName,
	description,
	onPlay,
	className,
	href,
}: ArcadeGameCardProps): React.ReactNode {
	const handlePlay = (): void => {
		if (href) {
			window.location.href = href
		} else if (onPlay) {
			onPlay()
		}
	}

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300",
				"border-4 border-fox hover:shadow-xl",
				className
			)}
		>
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src={backgroundImage}
					alt={gameName}
					fill
					className="object-cover"
					priority={false}
				/>
				{/* Gradient overlay for better text readability */}
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
			</div>

			{/* Content Container */}
			<div className="relative flex flex-col min-h-[450px] p-6">
				{/* Spacer to push content to bottom */}
				<div className="flex-1" />

				{/* Bottom Section with Icon, Name, Description, and Button */}
				<div className="flex flex-col gap-4">
					{/* Icon and Name Row */}
					<div className="flex items-end gap-4">
						{/* Game Icon */}
						<div className="shrink-0">
							{typeof gameIcon === "string" ? (
								<div className={cn(
									"relative size-16 rounded-lg overflow-hidden bg-white/10",
									"backdrop-blur-sm border-2 border-white/20"
								)}>
									<Image
										src={gameIcon}
										alt={`${gameName} icon`}
										fill
										className="object-cover p-2"
									/>
								</div>
							) : (
								<div className={cn(
									"size-16 rounded-lg bg-white/10 backdrop-blur-sm",
									"border-2 border-white/20 flex items-center justify-center text-white"
								)}>
									{gameIcon}
								</div>
							)}
						</div>

						{/* Game Name */}
						<div className="flex-1">
							<h3 className="text-2xl font-bold text-white drop-shadow-lg">
								{gameName}
							</h3>
						</div>
					</div>

					{/* Description */}
					<p className="text-white/90 text-sm leading-relaxed drop-shadow-md max-w-2xl">
						{description}
					</p>

					{/* Play Button */}
					<div className="pt-2">
						<Button
							onClick={handlePlay}
							size="lg"
							className={cn(
								"bg-white text-black hover:bg-white/90 font-semibold",
								"shadow-lg hover:shadow-xl transition-all duration-200"
							)}
						>
							<Play className="mr-2 size-5" />
							Play
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

