import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"

export default function ShowLEDLessons() {
	const groupedLedLessons = ledLessons.reduce((acc, lesson) => {
		if (lesson.stackWithPrevious) {
			// Get the last group
			const lastGroup = acc[acc.length - 1]
			// Add this lesson to the existing group
			lastGroup.lessons.push(lesson)
			return acc
		} else {
			// Create a new group with this lesson
			acc.push({
				lessons: [lesson],
				position: acc.length
			})
			return acc
		}
	}, [] as { lessons: typeof ledLessons, position: number }[])

	return (
		<>
			{groupedLedLessons.map((group, groupIndex) => {
				// Get the height needed for container based on last item's position
				const lastItem = group.lessons[group.lessons.length - 1]
				const containerHeight = lastItem.stackWithPrevious
					? setLessonVerticalPosition(9)
					: setLessonVerticalPosition(lastItem.verticalPosition)

				return (
					<div
						key={groupIndex}
						className="relative mr-56"
						style={{ height: containerHeight }}
					>
						{group.lessons.map((lesson, lessonIndex) => {
							let effectivePosition
							if (lesson.stackWithPrevious) {
								// If it's the second item in stack, align with position 5
								// If it's the third item in stack, align with position 9
								// eslint-disable-next-line no-nested-ternary
								effectivePosition = lessonIndex === 1 ? 5 : lessonIndex === 2 ? 9 : lesson.verticalPosition
							} else {
								effectivePosition = lesson.verticalPosition
							}

							return (
								<div
									key={lessonIndex}
									className="absolute"
									style={{
										top: setLessonVerticalPosition(effectivePosition)
									}}
								>
									<Lilypad lesson={lesson} />
								</div>
							)
						})}
					</div>
				)
			})}
		</>
	)
}
