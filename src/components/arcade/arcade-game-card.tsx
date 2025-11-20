"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { useCallback } from "react"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, FlappyBirdArcadeTriggerType, TurretArcadeTriggerType } from "@lever-labs/common-ts/protocol"

interface ArcadeGameCardProps {
	backgroundImage: string
	gameIcon: React.ReactNode
	gameName: string
	description: string
	href: PageNames
}

// eslint-disable-next-line max-lines-per-function
export function ArcadeGameCard({
	backgroundImage,
	gameIcon,
	gameName,
	description,
	href
}: ArcadeGameCardProps): React.ReactNode {
	const navigate = useTypedNavigate()
	const goToGame = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		// Send ENTER trigger when navigating to turret game
		if (href === "/arcade/turret") {
			void careerQuestTrigger(CareerType.TURRET_ARCADE, TurretArcadeTriggerType.ENTER_TURRET_ARCADE)
		} else if (href === "/arcade/flappy") {
			void careerQuestTrigger(CareerType.FLAPPY_BIRD_ARCADE, FlappyBirdArcadeTriggerType.ENTER_FLAPPY_BIRD_ARCADE)
		}
		navigate(href)
	}, [navigate, href])

	return (
		<div
			onClick={goToGame}
			className={cn(
				"group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300",
				"border-4 border-fox hover:shadow-xl w-full cursor-pointer",
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
					{/* Description */}
					<p className="text-white/90 text-sm leading-relaxed drop-shadow-md max-w-2xl">
						{description}
					</p>

					{/* Bottom Row: Icon, Title, and Play Button */}
					<div className="flex items-center gap-4">
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

						{/* Play Button */}
						<div className="shrink-0">
							<Button
								onClick={goToGame}
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
		</div>
	)
}

