"use client"
import React, { ReactNode, useCallback, useEffect } from "react"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import arcadeClass from "../../classes/arcade-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import relativeDateFormatter from "../../utils/sandbox/date-formatting"
import {
	CareerType,
	CityDrivingArcadeTriggerType,
	FlappyBirdArcadeTriggerType,
	TurretArcadeTriggerType
} from "@actamayev/lever-labs-common-ts/protocol"
import authClass from "../../classes/auth-class"
import retrieveAllArcadeScores from "../../utils/arcade/retrieve-all-arcade-scores"

interface ArcadeGameLayoutProps {
	canvas: ReactNode
	onStart: () => void
	onPlayAgain: () => void
}

interface HighScoreItem {
	score: number
	username: string
	timestamp: Date
	isOwn: boolean
}

function HighScoresPanel({ scores }: { scores: HighScoreItem[] }): React.ReactNode {
	return (
		<div className="lg:w-80 shrink-0">
			<div className="bg-[#2d3748] rounded-lg p-6 h-full">
				<h2 className="text-white text-xl font-bold mb-4">High Scores</h2>
				{scores.length === 0 ? (
					<div className="text-[#a0aec0] text-center py-8">
						<p>No scores yet!</p>
						<p className="text-sm mt-2">Play to see your scores here.</p>
					</div>
				) : (
					<div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
						{scores.map((scoreData, index): React.ReactNode => (
							<div
								key={`${scoreData.score}-${scoreData.timestamp.getTime()}-${scoreData.username}`}
								className={`p-3 rounded-lg ${
									scoreData.isOwn
										? "bg-[#48bb78]/20 border-2 border-[#48bb78]"
										: "bg-[#1a202c] border border-[#4a5568]"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<div className="flex items-center gap-2">
										<span
											className={`font-bold ${
												scoreData.isOwn ? "text-[#48bb78]" : "text-white"
											}`}
										>
											{index + 1}.
										</span>
										<span
											className={`font-semibold ${
												scoreData.isOwn ? "text-[#48bb78]" : "text-white"
											}`}
										>
											{scoreData.username}
										</span>
										{scoreData.isOwn && (
											<span className="text-xs text-[#48bb78]">(You)</span>
										)}
									</div>
									<span
										className={`font-bold ${
											scoreData.isOwn ? "text-[#48bb78]" : "text-[#a0aec0]"
										}`}
									>
										{scoreData.score}
									</span>
								</div>
								<div className="text-xs text-[#a0aec0]">
									{relativeDateFormatter(scoreData.timestamp)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

// eslint-disable-next-line max-lines-per-function
function ArcadeGameLayout({
	canvas,
	onStart,
	onPlayAgain
}: ArcadeGameLayoutProps): React.ReactNode {
	const pathname = usePathname()
	const navigate = useTypedNavigate()

	useEffect((): void => {
		void retrieveAllArcadeScores()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup])

	const handleBack = useCallback((): void => {
		// Determine which career quest trigger to send based on pathname
		if (pathname === "/arcade/turret") {
			void careerQuestTrigger(CareerType.TURRET_ARCADE, TurretArcadeTriggerType.EXIT_TURRET_ARCADE)
		} else if (pathname === "/arcade/flappy") {
			void careerQuestTrigger(CareerType.FLAPPY_BIRD_ARCADE, FlappyBirdArcadeTriggerType.EXIT_FLAPPY_BIRD_ARCADE)
		} else if (pathname === "/arcade/city-driver") {
			void careerQuestTrigger(CareerType.CITY_DRIVING_ARCADE, CityDrivingArcadeTriggerType.EXIT_CITY_DRIVING_ARCADE)
		}
		navigate("/arcade")
	}, [pathname, navigate])

	const metadata = arcadeClass.getCurrentGameMetadata()
	const gameState = arcadeClass.getCurrentGameState()

	if (!metadata || !gameState) return null

	const { title, instructions, startScreenTitle, startScreenDescription } = metadata
	const { gameStarted, gameOver, score } = gameState
	const highScore = arcadeClass.currentGame ? arcadeClass.getPersonalBest(arcadeClass.currentGame) : 0
	const allSortedHighScores = arcadeClass.currentGame
		? arcadeClass.getSortedHighScores(arcadeClass.currentGame)
		: []

	// Filter to show only the highest score per user
	const sortedHighScores = allSortedHighScores.reduce((acc: HighScoreItem[], scoreData): HighScoreItem[] => {
		const existingUser = acc.find((s): boolean => s.username === scoreData.username)
		if (!existingUser) {
			acc.push(scoreData)
		}
		return acc
	}, [])

	return (
		<div className="flex flex-col min-h-screen bg-[#1a202c] font-sans relative">
			{/* Back Button */}
			<Button
				onClick={handleBack}
				variant="ghost"
				size="icon"
				className="absolute top-4 left-4 text-white hover:bg-white/10 z-10"
			>
				<ArrowLeft className="size-5" />
			</Button>

			{/* Title */}
			<div className="w-full text-center py-4">
				<h1 className="text-white text-2xl">{title}</h1>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 pb-4">
				{/* Instructions Panel - Left Side */}
				<div className="lg:w-80 shrink-0">
					<div className="bg-[#2d3748] rounded-lg p-6 h-full">
						<div className="text-[#a0aec0] space-y-4">
							{instructions}
						</div>
					</div>
				</div>

				{/* Game Canvas - Center */}
				<div className="flex-1 flex items-center justify-center relative">
					{canvas}

					{/* Start Screen Overlay */}
					{!gameStarted && !gameOver && (
						<div
							className={
								"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
								"bg-black/90 p-10 rounded-xl text-center border-4 border-[#48bb78] z-20 max-w-md w-full"
							}
						>
							<h2 className="text-[#48bb78] text-4xl m-0 mb-5">{startScreenTitle}</h2>
							<p className="text-white text-lg m-0 mb-8 max-w-md">
								{startScreenDescription}
							</p>
							<Button
								onClick={onStart}
								size="lg"
								className="bg-[#48bb78] hover:bg-[#48bb78]/90 text-white font-bold"
							>
								Start Game
							</Button>
						</div>
					)}

					{/* Game Over Overlay */}
					{gameOver && (
						<div
							className={
								"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
								"bg-black/90 p-10 rounded-xl text-center border-4 border-[#ff6b6b] z-20 max-w-md w-full"
							}
						>
							<h2 className="text-[#ff6b6b] text-5xl m-0 mb-5">GAME OVER</h2>
							<p className="text-white text-2xl m-0 mb-2">
								Final Score: {score}
							</p>
							{score >= highScore && score > 0 && (
								<p className="text-[#ffd93d] text-lg m-0 mb-8">🎉 New High Score! 🎉</p>
							)}
							<Button
								onClick={onPlayAgain}
								size="lg"
								className="bg-[#48bb78] hover:bg-[#48bb78]/90 text-white font-bold"
							>
								Play Again
							</Button>
						</div>
					)}
				</div>

				{/* High Scores Panel - Right Side */}
				<HighScoresPanel scores={sortedHighScores} />
			</div>
		</div>
	)
}

export default observer(ArcadeGameLayout)

