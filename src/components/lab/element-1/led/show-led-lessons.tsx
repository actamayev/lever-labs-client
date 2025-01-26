import { useMemo } from "react"
import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"

// Helper function to get vertical position for stacked items
const getStackPosition = (index: number, defaultPosition: VerticalPosition): VerticalPosition => {
	if (!index) return defaultPosition  // First item uses its default position
	return index === 1 ? 5 : 9         // Second item at 5, third at 9
}

export default function ShowLEDLessons() {
	const groups = useMemo(() => {
		return ledLessons.reduce<Array<typeof ledLessons>>((acc, lesson) => {
			if (lesson.stackWithPrevious) {
				acc[acc.length - 1].push(lesson)
			} else {
				acc.push([lesson])
			}
			return acc
		}, [])
	}, [])

	return (
		<>
			{groups.map((groupLessons) => (
				<div
					key={groupLessons[0].lessonUrl}
					className="relative mr-56"
					style={{
						height: setLessonVerticalPosition(groupLessons.length > 1 ? 9 : groupLessons[0].verticalPosition)
					}}
				>
					{groupLessons.map((lesson, index) => (
						<div
							key={lesson.lessonUrl}
							className="absolute"
							style={{
								top: setLessonVerticalPosition(
									(lesson.stackWithPrevious
										? getStackPosition(index, lesson.verticalPosition)
										: lesson.verticalPosition)
								)
							}}
						>
							<Lilypad lesson={lesson} />
						</div>
					))}
				</div>
			))}
		</>
	)
}
