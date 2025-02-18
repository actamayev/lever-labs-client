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

export default function ShowLEDLessons() {
	const [lilypadPositions, setLilypadPositions] = useState<LilyPadPositions[]>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const lilypadSectionRef = useRef<HTMLDivElement>(null)

	const groups = useMemo(() => {
		return ledLessons.map(lesson => [lesson])
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

	const renderablePositions = useMemo(() => [...lilypadPositions], [lilypadPositions])

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
					{groups.map((groupLessons) => (
						<div
							key={groupLessons[0].lessonUrl}
							className="relative"
							style={{
								height: setLessonVerticalPosition(
									groupLessons.length > 1 ? 9 : groupLessons[0].verticalPosition
								),
								marginRight: "200px"
							}}
						>
							{groupLessons.map((lesson) => (
								<div
									key={lesson.lessonUrl}
									className="absolute"
									style={{ top: setLessonVerticalPosition(lesson.verticalPosition)} }
								>
									<Lilypad lesson={lesson} />
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
