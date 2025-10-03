/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"

function LessonList(): React.ReactNode {
	const lessons = Array.from(learnClass.lessonsById.values())
	const navigate = useTypedNavigate()

	if (learnClass.isRetrievingAllLessons) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-lg">Loading lessons...</div>
			</div>
		)
	}

	if (lessons.length === 0) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-lg">No lessons available</div>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
			{lessons.map((lesson): React.ReactNode => (
				<div
					key={lesson.lessonId}
					onClick={(): void => navigate(`/learn/${lesson.lessonId}`)}
					className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
				>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							{lesson.lessonName}
						</h3>
						{lesson.isCompleted && (
							<div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm font-medium">
								Completed
							</div>
						)}
					</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">
						Lesson ID: {lesson.lessonId}
					</div>
				</div>
			))}
		</div>
	)
}

export default observer(LessonList)
