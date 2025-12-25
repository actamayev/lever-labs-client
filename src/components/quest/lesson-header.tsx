"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo } from "react"
import { LessonUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import questClass from "../../classes/quest-class"
import ExitLessonDialog from "./exit-lesson-dialog"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import NetworkWorkbench from "../workbench/network/network-workbench"
import ConnectToPipButton from "../connect-pip/connect-to-pip-button"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import SandboxBatterySection from "../sandbox/sandbox-project/header/sandbox-battery-section"

// eslint-disable-next-line max-lines-per-function
function LessonHeader({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = questClass.getLesson(lessonId)

	const progress = useMemo((): number => {
		if (!lesson?.lessonQuestionMap) return 0

		const totalQuestions = lesson.lessonQuestionMap.length
		if (totalQuestions === 0) return 0

		const progressPercent = (lesson.numberQuestionsCorrect / totalQuestions) * 100

		return progressPercent
	}, [lesson?.lessonQuestionMap, lesson?.numberQuestionsCorrect])

	// Track matching question state to ensure MobX reactivity
	const hasMatchingProgress = useMemo((): boolean => {
		if (!lesson?.lessonQuestionMap) return false
		// Access matching state to ensure MobX tracks changes
		return lesson.lessonQuestionMap.some((questionMap): boolean => {
			const question = questionMap.question
			if (question.questionType !== "MATCHING" || !question.matchingAnswerState) {
				return false
			}
			const matchingState = question.matchingAnswerState
			// Access properties so MobX tracks them
			return matchingState.correctlyMatchedBlockIds.length > 0 ||
				Object.values(matchingState.matchResults).some((result): boolean => result === true)
		})
	}, [lesson?.lessonQuestionMap])

	// Handle beforeunload warning - only show if user has any progress
	// Always register the listener so it can check progress at the time of the event
	useEffect((): () => void => {
		const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
			// Re-check progress at the time of the event in case state changed
			if (questClass.hasLessonProgress(lessonId)) {
				e.preventDefault()
				e.returnValue = "Changes you made may not be saved."
			}
		}

		window.addEventListener("beforeunload", handleBeforeUnload)

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [lessonId, lesson?.numberQuestionsCorrect, hasMatchingProgress])

	const handleBack = useCallback((): void => {
		// Check if user has progress (questions correct > 0 or partial matching progress)
		if (questClass.hasLessonProgress(lessonId)) {
			questClass.setIsExitDialogOpen(true)
			return
		}

		navigate("/quest")
		stopCurrentlyRunningCode(true)
		questClass.resetLessonProgress(lessonId)
	}, [navigate, lessonId])

	return (
		<>
			<header className="h-[15vh] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96">
				{/* Left: Back button */}
				<button
					onClick={handleBack}
					className="flex items-center justify-center w-6 h-6 rounded-full duration-0"
					aria-label="Go back to lessons"
				>
					<svg
						className="w-6 h-6 text-hare hover:text-wolf"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Center: Progress bar */}
				<div className="flex-1 mx-10">
					<div className="w-full bg-swan rounded-full h-4">
						<div
							className="bg-charging-green h-4 rounded-full transition-all duration-300 relative overflow-hidden"
							style={{ width: `${progress}%` }}
						>
							<div className="absolute top-1 left-1.5 right-1.5 h-[3px] bg-charging-green-1 rounded-full" />
						</div>
					</div>
				</div>
				{pipClass.selectedPip ? (
					<div className="flex flex-row gap-3">
						<SandboxBatterySection />
						<NetworkWorkbench isSandboxPage={true} />
					</div>
				) : (
					<div className="h-full flex items-center justify-center mb-1">
						<ConnectToPipButton
							colors={getDuolingoColors("humpback")}
							tactileButtonClasses="h-8 text-xl"
							botIconClasses="size-6!"
						/>
					</div>
				)}
			</header>
			<ExitLessonDialog lessonId={lessonId}/>
		</>
	)
}

export default observer(LessonHeader)
