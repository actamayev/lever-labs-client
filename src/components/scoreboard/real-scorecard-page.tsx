"use client"

import { ClassCode, ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Play, Pause, Car, Lightbulb, Plus, Minus } from "lucide-react"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { Card, CardContent } from "../shadcn/ui/card"
import { cn } from "../../lib/shadcn/utils"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import updateScoreboardTime from "../../utils/teacher/scoreboard/update-scoreboard-time"
import updateScoreboardTeamScore from "../../utils/teacher/scoreboard/update-scoreboard-team-score"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"

// eslint-disable-next-line max-lines-per-function
function RealScoreboardPage({ classCode, scoreboardId }: { classCode: ClassCode; scoreboardId: ScoreboardUUID }): React.ReactNode {
	const scoreboardData = teacherClass.getScoreboardData(scoreboardId)
	const navigate = useTypedNavigate()
	const [isPaused, setIsPaused] = useState(true)
	const [displayTime, setDisplayTime] = useState(0)
	const [hasBeenStarted, setHasBeenStarted] = useState(false)
	const colors = getDuolingoColors("humpback")
	
	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	// Initialize display time when scoreboard data loads
	useEffect((): void => {
		if (scoreboardData) {
			setDisplayTime(scoreboardData.timeRemaining)
		}
	}, [scoreboardData])

	// Timer countdown effect
	useEffect((): (() => void) | undefined => {
		if (!isPaused && displayTime > 0 && hasBeenStarted) {
			const timer = setInterval((): void => {
				setDisplayTime((prev): number => {
					if (prev <= 1) {
						setIsPaused(true)
						return 0
					}
					return prev - 1
				})
			}, 1000)

			return (): void => clearInterval(timer)
		}
		return undefined
	}, [isPaused, displayTime, hasBeenStarted])

	// Update server when display time changes
	useEffect((): void => {
		if (scoreboardData && displayTime !== scoreboardData.timeRemaining) {
			void updateScoreboardTime(scoreboardId, displayTime)
		}
	}, [displayTime, scoreboardId, scoreboardData])

	const handleBackClick = useCallback((): void => {
		navigate(`/class-manager/${classCode}`)
	}, [navigate, classCode])

	const handlePauseResume = useCallback((): void => {
		if (isPaused) {
			// Starting the timer for the first time
			setHasBeenStarted(true)
		}
		setIsPaused(!isPaused)
	}, [isPaused])

	const handleAddTime = useCallback((seconds: number): void => {
		setDisplayTime((prev): number => prev + seconds)
	}, [])

	const handleTeamScoreChange = useCallback((teamNumber: 1 | 2, change: number): void => {
		if (!scoreboardData) return

		const currentScore = teamNumber === 1 ? scoreboardData.team1Stats.score : scoreboardData.team2Stats.score
		const newScore = Math.max(0, currentScore + change)

		void updateScoreboardTeamScore(scoreboardId, teamNumber, newScore)
	}, [scoreboardData, scoreboardId])

	const formatTime = useCallback((seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
	}, [])

	// Show loading state while retrieving classroom data
	if (teacherClass.isRetrievingDetailedData) {
		return (
			<div className="min-h-screen bg-standardBackground p-6">
				<div className="mb-8">
					<TactileButton
						onClick={handleBackClick}
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Class Manager
					</TactileButton>
				</div>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading scoreboard data...</div>
				</div>
			</div>
		)
	}

	if (!scoreboardData) return <div>Scoreboard not found</div>

	return (
		<div className="min-h-screen bg-standardBackground p-6">
			{/* Back Button */}
			<div className="mb-8">
				<TactileButton
					onClick={handleBackClick}
					className="flex items-center gap-2 px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
					shadowHeight={4}
					shadowClass="shadow-hare"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Class Manager
				</TactileButton>
			</div>

			{/* Timer Section */}
			<div className="text-center mb-12">
				<div className="text-8xl font-mono font-bold text-wolf mb-6">
					{formatTime(displayTime)}
				</div>

				{/* Timer Control Buttons */}
				<div className="flex justify-center gap-4">
					<TactileButton
						onClick={handlePauseResume}
						className={cn("px-6 py-3 rounded-xl text-lg text-white", isPaused ? colors.bg : "bg-eel dark:bg-swan")}
						shadowHeight={4}
						shadowClass={isPaused ? colors.shadow2 : "shadow-hare"}
					>
						{isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
					</TactileButton>

					<TactileButton
						onClick={(): void => handleAddTime(10)}
						className={cn("px-6 py-3 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						+10
					</TactileButton>

					<TactileButton
						onClick={(): void => handleAddTime(30)}
						className={cn("px-6 py-3 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						+30
					</TactileButton>
				</div>
			</div>

			{/* Teams Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Team 1 */}
				<Card className="border-2 border-swan bg-standardBackground">
					<CardContent className="p-6">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-wolf underline mb-4">
								{scoreboardData.team1Stats.teamName}
							</h2>

							<div className="text-6xl font-bold text-wolf mb-6">
								{scoreboardData.team1Stats.score}
							</div>

							<div className="flex justify-center gap-4 mb-6">
								<TactileButton
									onClick={(): void => handleTeamScoreChange(1, -1)}
									className="px-4 py-2 rounded-xl text-lg text-white bg-cardinal"
									shadowHeight={4}
									shadowClass="shadow-cardinal"
								>
									<Minus className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									onClick={(): void => handleTeamScoreChange(1, 1)}
									className="px-4 py-2 rounded-xl text-lg text-white bg-chargingGreen"
									shadowHeight={4}
									shadowClass="shadow-chargingGreen"
								>
									<Plus className="h-4 w-4" />
								</TactileButton>
							</div>

							<div className="flex justify-center gap-4">
								<TactileButton
									className="px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
									shadowHeight={4}
									shadowClass="shadow-hare"
								>
									<Car className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									className="px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
									shadowHeight={4}
									shadowClass="shadow-hare"
								>
									<Lightbulb className="h-4 w-4" />
								</TactileButton>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Team 2 */}
				<Card className="border-2 border-swan bg-standardBackground">
					<CardContent className="p-6">
						<div className="text-center">
							<h2 className="text-2xl font-bold text-wolf underline mb-4">
								{scoreboardData.team2Stats.teamName}
							</h2>

							<div className="text-6xl font-bold text-wolf mb-6">
								{scoreboardData.team2Stats.score}
							</div>

							<div className="flex justify-center gap-4 mb-6">
								<TactileButton
									onClick={(): void => handleTeamScoreChange(2, -1)}
									className="px-4 py-2 rounded-xl text-lg text-white bg-cardinal"
									shadowHeight={4}
									shadowClass="shadow-cardinal"
								>
									<Minus className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									onClick={(): void => handleTeamScoreChange(2, 1)}
									className="px-4 py-2 rounded-xl text-lg text-white bg-chargingGreen"
									shadowHeight={4}
									shadowClass="shadow-chargingGreen"
								>
									<Plus className="h-4 w-4" />
								</TactileButton>
							</div>

							<div className="flex justify-center gap-4">
								<TactileButton
									className="px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
									shadowHeight={4}
									shadowClass="shadow-hare"
								>
									<Car className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									className="px-4 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
									shadowHeight={4}
									shadowClass="shadow-hare"
								>
									<Lightbulb className="h-4 w-4" />
								</TactileButton>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default observer(RealScoreboardPage)
