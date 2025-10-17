"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import pipClass from "../../classes/pip-class"
import learnClass from "../../classes/learn-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
// import { TactileButton } from "../shadcn/ui/tactile-button"
// import { BotIcon } from "lucide-react"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import NetworkWorkbench from "../workbench/network/network-workbench"
import ConnectToPipButton from "../connect-pip/connect-to-pip-button"
import stopCareerTrigger from "../../utils/career-quest/stop-career-trigger"
import SandboxBatterySection from "../sandbox/sandbox-project/header/sandbox-battery-section"
import ExitLessonDialog from "./exit-lesson-dialog"

// eslint-disable-next-line max-lines-per-function
function LessonHeader({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = learnClass.getLesson(lessonId)

	const progress = useMemo((): number => {
		if (!lesson?.lessonQuestionMap) return 0

		const totalQuestions = lesson.lessonQuestionMap.length
		if (totalQuestions === 0) return 0

		const progressPercent = (lesson.numberQuestionsCorrect / totalQuestions) * 100

		return progressPercent
	}, [lesson?.lessonQuestionMap, lesson?.numberQuestionsCorrect])

	// Handle beforeunload warning - only show if user is still editing
	useEffect((): () => void => {
		const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
			if (!lesson) return
			if (lesson.numberQuestionsCorrect > 0) {
				e.preventDefault()
				e.returnValue = "Changes you made may not be saved."
			}
		}

		if (lesson?.numberQuestionsCorrect && lesson?.numberQuestionsCorrect > 0) {
			window.addEventListener("beforeunload", handleBeforeUnload)
		}

		return (): void => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lesson?.numberQuestionsCorrect])

	const handleBack = useCallback((): void => {
		// Check if user has progress (questions correct > 0)
		if (lesson && lesson.numberQuestionsCorrect > 0) {
			learnClass.setIsExitDialogOpen(true)
			return
		}

		navigate("/learn")
		stopCareerTrigger()
		learnClass.resetLessonProgress(lessonId)
	}, [navigate, lesson, lessonId])

	const handleEndSession = useCallback((): void => {
		// Reset lesson progress before navigating away
		if (lesson) learnClass.resetLessonProgress(lessonId)
		navigate("/learn")
		stopCareerTrigger()
	}, [navigate, lesson, lessonId])

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
							className="bg-chargingGreen h-4 rounded-full transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
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
							botIconClasses="!size-6"
						/>
					</div>
				)}

				{/* Right: Bot button */}
				{/* <TactileButton
					onClick={handleBotClick}
					shadowClass="shadow-macaw-2"
					className="w-10 h-10 bg-macaw"
				>
					<BotIcon className="size-10 text-standardBackground"/>
				</TactileButton> */}
			</header>
			<ExitLessonDialog onEndSession={handleEndSession} />
		</>
	)
}

export default observer(LessonHeader)
