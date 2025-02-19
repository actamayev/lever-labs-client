import { useRef, useEffect, useState } from "react"
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
	}, [])

	return (
		<div ref={containerRef} className="flex">
			<div ref={lilypadSectionRef} className="relative">
				{lilypadPositions.slice(0, -1).map((pos, i) => (
					<PathTickMark
						key={i}
						startPosition={pos}
						endPosition={lilypadPositions[i + 1]}
						arcDirection={pos.arcDirection}
					/>
				))}

				<div className="flex">
					{ledLessons.map((lesson) => (
						<div
							key={lesson.lessonUrl}
							className="relative mr-56"
							style={{
								height: setLessonVerticalPosition(lesson.verticalPosition)
							}}
						>
							<div
								className="absolute"
								style={{ top: setLessonVerticalPosition(lesson.verticalPosition)} }
							>
								<Lilypad lesson={lesson} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
