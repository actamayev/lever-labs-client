/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { isEmpty } from "lodash-es"
import questClass from "../../classes/quest-class"
import studentClass from "../../classes/student-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { useCallback } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

function LessonList(): React.ReactNode {
	const allLessons = Array.from(questClass.lessonsById.values()).sort((a, b): number => a.lessonOrder - b.lessonOrder)
	const isStudent = !isEmpty(studentClass.classroomData)
	const lessons = isStudent ? allLessons : allLessons.filter((lesson): boolean => lesson.lessonOrder >= 5)
	const navigate = useTypedNavigate()
	// currentQuestionIndex no longer needed for triggering enter here

	const goToQuestPage = useCallback((lessonId: LessonUUID): void => {
		// S8_P3_ENTER is now triggered within the MeetPipS8P3ColorViz component on mount
		navigate(`/quest/${lessonId}`)
	}, [navigate])

	if (questClass.isRetrievingAllLessons) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-lg">Loading lessons...</div>
			</div>
		)
	}

	if (isEmpty(lessons)) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-lg">No lessons available</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-2 py-6">
			{lessons.map((lesson): React.ReactNode => (
				<div
					key={lesson.lessonId}
					onClick={(): void => goToQuestPage(lesson.lessonId)}
					className="bg-standard-background rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 border border-swan flex items-center justify-between"
				>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						{lesson.lessonName}
					</h3>
					{lesson.isCompleted && (
						<div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm font-medium">
							Completed
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default observer(LessonList)
