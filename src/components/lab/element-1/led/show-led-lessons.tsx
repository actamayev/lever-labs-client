import { useMemo, useRef, useEffect, useState } from "react"
import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import PathTickMark from "../../lab-structure/path-tick-mark"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"

const getStackPosition = (index: number, defaultPosition: VerticalPosition): VerticalPosition => {
	if (!index) return defaultPosition
	return index === 1 ? 5 : 8
}

interface LilyPadPositions {
  x: number
  y: number
  skipConnection?: boolean
  arcDirection?: ArcDirection
}

// eslint-disable-next-line max-lines-per-function
export default function ShowLEDLessons() {
	const [lilypadPositions, setLilypadPositions] = useState<LilyPadPositions[]>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const lilypadSectionRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		if (!containerRef.current || !lilypadSectionRef.current) return

		const positions: LilyPadPositions[] = []

		const lilypads = containerRef.current.querySelectorAll("[data-lilypad-icon]")
		const lilypadSectionRect = lilypadSectionRef.current.getBoundingClientRect()

		lilypads.forEach((lilypad) => {
			const rect = lilypad.getBoundingClientRect()
			const skipConnection = lilypad.getAttribute("data-skip-connection") === "true"
			const arcDirection = lilypad.getAttribute("data-arc-direction") as (ArcDirection | null)

			positions.push({
				x: rect.left - lilypadSectionRect.left + rect.width / 2,
				y: rect.top - lilypadSectionRect.top + rect.height / 2,
				skipConnection,
				arcDirection: arcDirection || "straight"
			})
		})

		setLilypadPositions(positions)
	}, [groups])

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
			<div ref={lilypadSectionRef} className="relative">
				{renderablePositions.slice(0, -1).map((pos, i) => (
					<PathTickMark
						key={i}
						startPosition={pos}
						endPosition={renderablePositions[i + 1]}
						arcDirection={pos.arcDirection}
					/>
				))}

				<div className="flex">
					{groups.map((groupLessons) => {
						const isCodeGroup = groupLessons.some(lesson =>
							lesson.lessonName.includes("LED Code")
						)

						return (
							<div
								key={groupLessons[0].lessonUrl}
								className="relative mr-56"
								style={{
									height: setLessonVerticalPosition(
										groupLessons.length > 1 ? 9 : groupLessons[0].verticalPosition
									)
								}}
							>
								{isCodeGroup && (
									<div className="absolute inset-y-16 inset-x-12 -m-14 rounded-full border-2 border-zinc-200
									dark:border-zinc-700 opacity-100 transition-opacity" />
								)}
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
						)
					})}
				</div>
			</div>
		</div>
	)
}
