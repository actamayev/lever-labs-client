"use client"

import { observer } from "mobx-react"
import { useEffect } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import LessonQuestion from "./lesson-question"

function LessonQuestions({ lessonId }: { lessonId: LessonUUID}): React.ReactNode {
	const lesson = learnClass.getLesson(lessonId)

	// Initialize current question when lesson loads
	useEffect((): void => {
		if (lesson?.lessonQuestionMap && !learnClass.currentQuestionState) {
			learnClass.setCurrentQuestion(lessonId, 0)
		}
	}, [lesson?.lessonQuestionMap, lessonId])

	if (!lesson?.lessonQuestionMap || lesson.lessonQuestionMap.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500 dark:text-gray-400">
					No questions available for this lesson
				</p>
			</div>
		)
	}

	return (
		<div className="flex-1 min-h-0 flex flex-col justify-start">
			<LessonQuestion />
		</div>
	)
}

export default observer(LessonQuestions)
