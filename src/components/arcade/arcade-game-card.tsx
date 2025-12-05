"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { observer } from "mobx-react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { useCallback } from "react"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, CityDrivingArcadeTriggerType,
	FlappyBirdArcadeTriggerType, TurretArcadeTriggerType } from "@lever-labs/common-ts/protocol"
import arcadeClass from "../../classes/arcade-class"
import relativeDateFormatter from "../../utils/sandbox/date-formatting"

interface HighScoreItem {
	score: number
	username: string
	timestamp: Date
	isOwn: boolean
}

// eslint-disable-next-line max-lines-per-function
function ArcadeGameCard({ gameData }: { gameData: GameData }): React.ReactNode {
	const { backgroundImage, gameIcon, gameName, description, href, gameType } = gameData
	const highScore = arcadeClass.getPersonalBest(gameType)
	const allSortedHighScores = arcadeClass.getSortedHighScores(gameType)

	// Filter to show only the highest score per user
	const sortedHighScores = allSortedHighScores.reduce((acc: HighScoreItem[], scoreData): HighScoreItem[] => {
		const existingUser = acc.find((s): boolean => s.username === scoreData.username)
		if (!existingUser) {
			acc.push(scoreData)
		}
		return acc
	}, []).slice(0, 5) // Show top 5 scores

	const navigate = useTypedNavigate()
	const goToGame = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		// Send ENTER trigger when navigating to turret game
		if (href === "/arcade/turret") {
			void careerQuestTrigger(CareerType.TURRET_ARCADE, TurretArcadeTriggerType.ENTER_TURRET_ARCADE)
		} else if (href === "/arcade/flappy") {
			void careerQuestTrigger(CareerType.FLAPPY_BIRD_ARCADE, FlappyBirdArcadeTriggerType.ENTER_FLAPPY_BIRD_ARCADE)
		} else if (href === "/arcade/city-driver") {
			void careerQuestTrigger(CareerType.CITY_DRIVING_ARCADE, CityDrivingArcadeTriggerType.ENTER_CITY_DRIVING_ARCADE)
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
			<div className="relative flex h-[300px]">
				{/* Main Content Area - 4/5 width */}
				<div className="relative flex flex-col w-4/5 p-6">
					{/* Spacer to push content to bottom */}
					<div className="flex-1 min-h-0" />

					{/* Bottom Section with Icon, Name, Description, and Button */}
					<div className="flex flex-col gap-4">
						{/* Description */}
						<p className="text-white/90 text-sm leading-relaxed drop-shadow-md max-w-2xl">
							{description}
						</p>

						{/* Bottom Row: Icon, Title, High Score, and Play Button */}
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

							{/* Game Name and High Score */}
							<div className="flex-1">
								<h3 className="text-2xl font-bold text-white drop-shadow-lg">
									{gameName}
								</h3>
								{highScore > 0 && (
									<p className="text-white/70 text-sm mt-1 drop-shadow-md">
										My high Score: {highScore}
									</p>
								)}
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

				{/* High Scores Section - 1/5 width */}
				<div className="relative w-1/5 bg-black/40 backdrop-blur-sm border-l-2 border-white/20 p-4 flex flex-col h-full">
					<h4 className="text-white font-bold text-sm mb-3 drop-shadow-md shrink-0">High Scores</h4>
					{sortedHighScores.length === 0 ? (
						<div className="text-white/60 text-xs text-center py-4">
							<p>No scores yet</p>
						</div>
					) : (
						<div className="flex-1 overflow-y-auto space-y-2 min-h-0 max-h-full pr-1">
							{sortedHighScores.map((scoreData, index): React.ReactNode => (
								<div
									key={`${scoreData.score}-${scoreData.timestamp.getTime()}-${scoreData.username}`}
									className={cn(
										"p-2 rounded text-xs",
										scoreData.isOwn
											? "bg-white/20 border border-white/40"
											: "bg-white/10 border border-white/20"
									)}
								>
									<div className="flex items-center justify-between mb-1">
										<div className="flex items-center gap-1">
											<span className={cn(
												"font-bold",
												scoreData.isOwn ? "text-yellow-300" : "text-white"
											)}>
												{index + 1}.
											</span>
											<span className={cn(
												"font-semibold truncate max-w-[80px]",
												scoreData.isOwn ? "text-yellow-300" : "text-white/90"
											)}>
												{scoreData.username}
											</span>
										</div>
										<span className={cn(
											"font-bold",
											scoreData.isOwn ? "text-yellow-300" : "text-white/80"
										)}>
											{scoreData.score}
										</span>
									</div>
									<div className="text-white/60 text-[10px]">
										{relativeDateFormatter(scoreData.timestamp)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(ArcadeGameCard)
