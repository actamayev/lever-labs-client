import { useMemo, useRef, useEffect, useState } from "react"
import ledLessons from "./led-lessons-object"
import Lilypad from "../../lab-structure/lilypad/lilypad"
import PathTickMark from "../../lab-structure/path-tick-mark"
import setLessonVerticalPosition from "../../../../utils/lab/set-lesson-vertical-position"

interface LilyPadPositions {
	x: number
	y: number
	arcDirection: ArcDirection
}

// eslint-disable-next-line max-lines-per-function
export default function ShowLEDLessons() {
	const [lilypadPositions, setLilypadPositions] = useState<LilyPadPositions[]>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const lilypadSectionRef = useRef<HTMLDivElement>(null)

	const groups = useMemo(() => {
		return ledLessons.reduce<Array<typeof ledLessons>>((acc, lesson) => {
			acc.push([lesson])
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
			const arcDirection = lilypad.getAttribute("data-arc-direction") as (ArcDirection | null)

			positions.push({
				x: rect.left - lilypadSectionRect.left + rect.width / 2,
				y: rect.top - lilypadSectionRect.top + rect.height / 2,
				arcDirection: arcDirection || "straight"
			})
		})

		setLilypadPositions(positions)
	}, [groups])

	const renderablePositions = useMemo(() => {
		return lilypadPositions.reduce<typeof lilypadPositions>((acc, pos) => {
			acc.push(pos)
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
							lesson.activityType === "Code"
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
									<div
										className="absolute rounded-full border-2 border-zinc-300 dark:border-zinc-700
										bg-zinc-50 dark:bg-zinc-900"
										style={{
											height: "530px",
											width: "125px",
											left: "-15px",
											top: "40px"
										}}
									/>

								)}
								{groupLessons.map((lesson, index) => (
									<div
										key={lesson.lessonUrl}
										className="absolute"
										style={{
											top: setLessonVerticalPosition(lesson.verticalPosition
												// lesson.stackWithPrevious
												// 	? getStackPosition(index, lesson.verticalPosition)
												// 	: lesson.verticalPosition
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
