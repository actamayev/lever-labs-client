/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { TactileButton } from "../shadcn/ui/tactile-button"

function LessonHeader({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = learnClass.getLesson(lessonId)

	const progress = useMemo((): number => {
		if (!lesson?.lessonQuestionMap) return 0

		const totalQuestions = lesson.lessonQuestionMap.length
		if (totalQuestions === 0) return 0

		const completedQuestions = lesson.lessonQuestionMap.filter(
			(mapEntry): boolean => mapEntry.question.userHasAnsweredCorrectly === true
		).length

		return (completedQuestions / totalQuestions) * 100
	}, [lesson?.lessonQuestionMap])

	const handleBackClick = (): void => {
		navigate("/learn")
	}

	const handleBotClick = (): void => {
		// TODO: Implement bot functionality
	}

	return (
		<header className="h-[15vh] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96">
			{/* Left: Back button */}
			<button
				onClick={handleBackClick}
				className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-swan duration-0"
				aria-label="Go back to lessons"
			>
				<svg
					className="w-6 h-6 text-eel"
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
						className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* Right: Bot button */}
			<TactileButton
				onClick={handleBotClick}
				shadowClass="shadow-blue-2"
				className="w-10 h-10 p-0"
				aria-label="Bot assistance"
			>
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" />
				</svg>
			</TactileButton>
		</header>
	)
}

export default observer(LessonHeader)
