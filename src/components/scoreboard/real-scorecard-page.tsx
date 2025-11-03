"use client"

import { ClassCode, ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Play, Pause, Car, Lightbulb, Plus, Minus, Users, RotateCcw } from "lucide-react"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../buttons/tactile-button"
import { Card, CardContent } from "../ui/card"
import { cn } from "../../lib/utils"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import updateScoreboardTime from "../../utils/teacher/scoreboard/update-scoreboard-time"
import updateScoreboardTeamScore from "../../utils/teacher/scoreboard/update-scoreboard-team-score"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import updateTeamDrivingStatus from "../../utils/teacher/scoreboard/update-team-driving-status"
import updateTeamLightsStatus from "../../utils/teacher/scoreboard/update-team-lights-status"
import TeamMemberAssignmentDialog from "./team-member-assignment-dialog"
import authClass from "../../classes/auth-class"

// eslint-disable-next-line max-lines-per-function
function RealScoreboardPage({ classCode, scoreboardId }: { classCode: ClassCode; scoreboardId: ScoreboardUUID }): React.ReactNode {
	const scoreboardData = teacherClass.getScoreboardData(scoreboardId)
	const navigate = useTypedNavigate()
	const [isPaused, setIsPaused] = useState(true)
	const [displayTime, setDisplayTime] = useState(0)
	const [hasBeenStarted, setHasBeenStarted] = useState(false)
	const [isTeam1DialogOpen, setIsTeam1DialogOpen] = useState(false)
	const [isTeam2DialogOpen, setIsTeam2DialogOpen] = useState(false)
	const colors = getDuolingoColors("humpback")

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classCode, authClass.isFinishedWithSignup])

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

	const handleResetTime = useCallback((): void => {
		setDisplayTime(0)
		setIsPaused(true)
		setHasBeenStarted(false)
	}, [])

	const handleTeamScoreChange = useCallback((teamNumber: 1 | 2, change: number): void => {
		if (!scoreboardData) return

		const currentScore = teamNumber === 1 ? scoreboardData.team1Stats.score : scoreboardData.team2Stats.score
		const newScore = Math.max(0, currentScore + change)

		void updateScoreboardTeamScore(scoreboardId, teamNumber, newScore)
	}, [scoreboardData, scoreboardId])

	const handleTeamDrivingToggle = useCallback((teamNumber: 1 | 2): void => {
		const currentStatus = teacherClass.getTeamDrivingStatus(classCode, scoreboardId, teamNumber)
		if (currentStatus === null) return

		void updateTeamDrivingStatus(classCode, scoreboardId, teamNumber, !currentStatus)
	}, [classCode, scoreboardId])

	const handleTeamLightsToggle = useCallback((teamNumber: 1 | 2): void => {
		const currentStatus = teacherClass.getTeamLightsStatus(classCode, scoreboardId, teamNumber)
		if (currentStatus === null) return

		void updateTeamLightsStatus(classCode, scoreboardId, teamNumber, !currentStatus)
	}, [classCode, scoreboardId])

	const getTeamDrivingStatus = useCallback((teamNumber: 1 | 2): boolean | null => {
		return teacherClass.getTeamDrivingStatus(classCode, scoreboardId, teamNumber)
	}, [classCode, scoreboardId])

	const getTeamDrivingButtonClass = useCallback((teamNumber: 1 | 2): string => {
		const status = getTeamDrivingStatus(teamNumber)
		if (status === true) return "bg-charging-green border border-charging-green"
		if (status === false) return "bg-cardinal border border-cardinal"
		return "bg-eel dark:bg-swan"
	}, [getTeamDrivingStatus])

	const getTeamDrivingShadowClass = useCallback((teamNumber: 1 | 2): string => {
		const status = getTeamDrivingStatus(teamNumber)
		if (status === true) return "shadow-charging-green-2"
		if (status === false) return "shadow-cardinal-2"
		return "shadow-hare"
	}, [getTeamDrivingStatus])

	const getTeamLightsStatus = useCallback((teamNumber: 1 | 2): boolean | null => {
		return teacherClass.getTeamLightsStatus(classCode, scoreboardId, teamNumber)
	}, [classCode, scoreboardId])

	const getTeamLightsButtonClass = useCallback((teamNumber: 1 | 2): string => {
		const status = getTeamLightsStatus(teamNumber)
		if (status === true) return "bg-charging-green border border-charging-green"
		if (status === false) return "bg-cardinal border border-cardinal"
		return "bg-eel dark:bg-swan"
	}, [getTeamLightsStatus])

	const getTeamLightsShadowClass = useCallback((teamNumber: 1 | 2): string => {
		const status = getTeamLightsStatus(teamNumber)
		if (status === true) return "shadow-charging-green-2"
		if (status === false) return "shadow-cardinal-2"
		return "shadow-hare"
	}, [getTeamLightsStatus])

	const formatTime = useCallback((seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
	}, [])

	// Show loading state while retrieving classroom data
	if (teacherClass.isRetrievingDetailedData) {
		return (
			<div className="min-h-screen bg-standard-background p-6">
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

	if (!scoreboardData) {
		return (
			<div className="min-h-screen bg-standard-background p-6">
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
					<div className="text-lg text-eel">Scoreboard not found</div>
				</div>
			</div>)
	}

	return (
		<div className="min-h-screen bg-standard-background p-6">
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
						onClick={handleResetTime}
						className="px-6 py-3 rounded-xl text-lg text-white bg-cardinal"
						shadowHeight={4}
						shadowClass="shadow-cardinal"
					>
						<RotateCcw className="h-5 w-5" />
					</TactileButton>

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
				<Card className="border-2 border-swan bg-standard-background">
					<CardContent className="p-6">
						<div className="relative">
							{/* Team Assignment Button */}
							<TactileButton
								onClick={(): void => setIsTeam1DialogOpen(true)}
								className="absolute top-0 right-0 px-3 py-2 rounded-lg text-sm text-white bg-eel dark:bg-swan"
								shadowHeight={2}
								shadowClass="shadow-hare"
							>
								<Users className="h-4 w-4" />
							</TactileButton>
						</div>
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
									className="px-4 py-2 rounded-xl text-lg text-white bg-charging-green"
									shadowHeight={4}
									shadowClass="shadow-charging-green"
								>
									<Plus className="h-4 w-4" />
								</TactileButton>
							</div>

							<div className="flex justify-center gap-4">
								<TactileButton
									onClick={(): void => handleTeamDrivingToggle(1)}
									className={cn("px-4 py-2 rounded-xl text-lg text-white duration-0", getTeamDrivingButtonClass(1))}
									shadowHeight={4}
									shadowClass={getTeamDrivingShadowClass(1)}
								>
									<Car className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									onClick={(): void => handleTeamLightsToggle(1)}
									className={cn("px-4 py-2 rounded-xl text-lg text-white duration-0", getTeamLightsButtonClass(1))}
									shadowHeight={4}
									shadowClass={getTeamLightsShadowClass(1)}
								>
									<Lightbulb className="h-4 w-4" />
								</TactileButton>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Team 2 */}
				<Card className="border-2 border-swan bg-standard-background">
					<CardContent className="p-6">
						<div className="relative">
							{/* Team Assignment Button */}
							<TactileButton
								onClick={(): void => setIsTeam2DialogOpen(true)}
								className="absolute top-0 right-0 px-3 py-2 rounded-lg text-sm text-white bg-eel dark:bg-swan"
								shadowHeight={2}
								shadowClass="shadow-hare"
							>
								<Users className="h-4 w-4" />
							</TactileButton>
						</div>
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
									className="px-4 py-2 rounded-xl text-lg text-white bg-charging-green"
									shadowHeight={4}
									shadowClass="shadow-charging-green"
								>
									<Plus className="h-4 w-4" />
								</TactileButton>
							</div>

							<div className="flex justify-center gap-4">
								<TactileButton
									onClick={(): void => handleTeamDrivingToggle(2)}
									className={cn("px-4 py-2 rounded-xl text-lg text-white duration-0", getTeamDrivingButtonClass(2))}
									shadowHeight={4}
									shadowClass={getTeamDrivingShadowClass(2)}
								>
									<Car className="h-4 w-4" />
								</TactileButton>

								<TactileButton
									onClick={(): void => handleTeamLightsToggle(2)}
									className={cn("px-4 py-2 rounded-xl text-lg text-white duration-0", getTeamLightsButtonClass(2))}
									shadowHeight={4}
									shadowClass={getTeamLightsShadowClass(2)}
								>
									<Lightbulb className="h-4 w-4" />
								</TactileButton>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Team Assignment Dialogs */}
			<TeamMemberAssignmentDialog
				classCode={classCode}
				scoreboardId={scoreboardId}
				teamNumber={1}
				isOpen={isTeam1DialogOpen}
				setIsOpen={setIsTeam1DialogOpen}
			/>
			<TeamMemberAssignmentDialog
				classCode={classCode}
				scoreboardId={scoreboardId}
				teamNumber={2}
				isOpen={isTeam2DialogOpen}
				setIsOpen={setIsTeam2DialogOpen}
			/>
		</div>
	)
}

export default observer(RealScoreboardPage)
