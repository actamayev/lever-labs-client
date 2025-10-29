"use client"

import { Check } from "lucide-react"
import { observer } from "mobx-react"
import { useEffect, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { soundManager } from "../../classes/utility/sound-manager-class"

interface Analytics {
	percentage: number
	message: string
	score: number
	totalQuestions: number
}

function LessonCompletionScreen({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	useEffect((): void => {
		soundManager.playLevelPassed()
	}, [])

	const analytics = useMemo((): Analytics => {
		const lesson = learnClass.getLesson(lessonId)
		if (!lesson?.lessonQuestionMap) {
			return { percentage: 0, message: "Keep practicing!", score: 0, totalQuestions: 0 }
		}

		const totalQuestions = lesson.lessonQuestionMap.length
		const firstTryCorrect = lesson.numberQuestionsCorrectFirstTry
		const percentage = totalQuestions > 0 ? Math.round((firstTryCorrect / totalQuestions) * 100) : 0

		let message = "Keep practicing!"
		if (percentage >= 90) {
			message = "Amazing!"
		} else if (percentage >= 80) {
			message = "Great!"
		} else if (percentage >= 70) {
			message = "Good!"
		} else if (percentage >= 60) {
			message = "Nice!"
		}

		return {
			percentage,
			message,
			score: firstTryCorrect,
			totalQuestions
		}
	}, [lessonId])

	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="text-center">
				<Check className="size-24 text-charging-green mx-auto mb-6" />
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Lesson complete!
				</h1>
				<div className="text-center space-y-2">
					<h2 className="text-2xl font-semibold text-charging-green">
						{analytics.message}
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						{analytics.percentage}%
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-500">
						{analytics.score} out of {analytics.totalQuestions} questions correct
					</p>
				</div>
			</div>
		</div>
	)
}

export default observer(LessonCompletionScreen)
