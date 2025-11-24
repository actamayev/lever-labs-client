"use client"
import React, { ReactNode, useCallback } from "react"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import arcadeClass from "../../classes/arcade-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import {
	CareerType,
	CityDrivingArcadeTriggerType,
	FlappyBirdArcadeTriggerType,
	TurretArcadeTriggerType
} from "@lever-labs/common-ts/protocol"

interface ArcadeGameLayoutProps {
	canvas: ReactNode
	onStart: () => void
	onPlayAgain: () => void
}

// eslint-disable-next-line max-lines-per-function
function ArcadeGameLayout({
	canvas,
	onStart,
	onPlayAgain
}: ArcadeGameLayoutProps): React.ReactNode {
	const pathname = usePathname()
	const navigate = useTypedNavigate()

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
			</div>
		</div>
	)
}

export default observer(ArcadeGameLayout)

