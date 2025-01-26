import { isNull } from "lodash-es"
import { useMemo, useRef, useEffect, useState } from "react"
import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import PathTickMark from "../../lab-structure/path-tick-mark"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"

const getStackPosition = (index: number, defaultPosition: VerticalPosition): VerticalPosition => {
	if (!index) return defaultPosition
	return index === 1 ? 5 : 9
}

export default function ShowLEDLessons() {
	const [lilypadPositions, setLilypadPositions] = useState<Array<{ x: number; y: number; skipConnection?: boolean }>>([])
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

		const positions: Array<{ x: number; y: number; skipConnection?: boolean }> = []
		const lilypads = containerRef.current.querySelectorAll("[data-lilypad-icon]")

		lilypads.forEach((lilypad) => {
			const rect = lilypad.getBoundingClientRect()
			if (isNull(containerRef.current)) return
			const containerRect = containerRef.current.getBoundingClientRect()
			const skipConnection = lilypad.getAttribute("data-skip-connection") === "true"

			positions.push({
				x: rect.left - containerRect.left + rect.width / 2,
				y: rect.top - containerRect.top + rect.height / 2,
				skipConnection
			})
		})

		setLilypadPositions(positions)
	}, [groups])

	// Filter out positions that should be skipped when rendering path marks
	const renderablePositions = useMemo(() => {
		return lilypadPositions.reduce<typeof lilypadPositions>((acc, pos) => {
			if (!pos.skipConnection) {
				acc.push(pos)
			}
			return acc
		}, [])
	}, [lilypadPositions])

	return (
		<div ref={containerRef} className="flex">
			{/* Path marks between Lilypads */}
			{renderablePositions.slice(0, -1).map((pos, i) => (
				<PathTickMark
					key={i}
					startPosition={pos}
					endPosition={renderablePositions[i + 1]}
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
