
"use client"

import { observer } from "mobx-react"
import { useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { BotIcon } from "lucide-react"

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
						className="bg-chargingGreen h-4 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			{/* Right: Bot button */}
			<TactileButton
				onClick={handleBotClick}
				shadowClass="shadow-macaw-2"
				className="w-10 h-10 bg-macaw"
			>
				<BotIcon className="size-10 text-standardBackground"/>
			</TactileButton>
		</header>
	)
}

export default observer(LessonHeader)
