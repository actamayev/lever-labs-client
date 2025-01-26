import { useMemo, useRef, useEffect, useState } from "react"
import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"
import PathTickMark from "../../lab-structure/path-tick-mark"

const getStackPosition = (index: number, defaultPosition: VerticalPosition): VerticalPosition => {
	if (!index) return defaultPosition
	return index === 1 ? 5 : 9
}

export default function ShowLEDLessons() {
	const [lilypadPositions, setLilypadPositions] = useState<Array<{ x: number; y: number }>>([])
	const containerRef = useRef<HTMLDivElement>(null)

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

	// Calculate Lilypad positions after render
	useEffect(() => {
		if (!containerRef.current) return

		const positions: Array<{ x: number; y: number }> = []
		const lilypads = containerRef.current.querySelectorAll("[data-lilypad]")

		lilypads.forEach((lilypad) => {
			const rect = lilypad.getBoundingClientRect()
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const containerRect = containerRef.current!.getBoundingClientRect()
			positions.push({
				x: rect.left - containerRect.left + rect.width / 2,
				y: rect.top - containerRect.top + rect.height / 2
			})
		})

		setLilypadPositions(positions)
	}, [groups])

	return (
		<div ref={containerRef} className="flex">
			{/* Path marks between Lilypads */}
			{lilypadPositions.slice(0, -1).map((pos, i) => (
				<PathTickMark
					key={i}
					startPosition={pos}
					endPosition={lilypadPositions[i + 1]}
				/>
			))}

			{/* Lilypads */}
			{groups.map((groupLessons) => (
				<div
					key={groupLessons[0].lessonUrl}
					className="relative mr-56"
					style={{
						height: setLessonVerticalPosition(
							groupLessons.length > 1 ? 9 : groupLessons[0].verticalPosition
						)
					}}
				>
					{groupLessons.map((lesson, index) => (
						<div
							key={lesson.lessonUrl}
							className="absolute"
							data-lilypad
							style={{
								top: setLessonVerticalPosition(
									lesson.stackWithPrevious
										? getStackPosition(index, lesson.verticalPosition)
										: lesson.verticalPosition
								)
							}}
						>
							<Lilypad lesson={lesson} />
						</div>
					))}
				</div>
			))}
		</div>
	)
}
