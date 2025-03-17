"use client"

import { observer } from "mobx-react"
import { useRef, useEffect, useState } from "react"
import Lilypad from "./lilypad/lilypad"
import PathTickMark from "./path-tick-mark"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import { useActivityProgressContext } from "../../../contexts/activity-progress-context"

interface LilyPadPositions {
    x: number
    y: number
    arcDirection: ArcDirection
}

function CreateLilypadsAndTicks() {
	const activityProgressClass = useActivityProgressContext()
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
		// This dependency is needed so that the ticks are made when the activities are loaded in:
	}, [activityProgressClass.activities])

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
					{activityProgressClass.activities.map((activity) => (
						<div
							key={activity.activityUrl}
							className="relative mr-56"
							style={{
								height: setLessonVerticalPosition(activity.verticalPosition)
							}}
						>
							<div
								className="absolute"
								style={{ top: setLessonVerticalPosition(activity.verticalPosition)} }
							>
								<Lilypad activity={activity} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default observer(CreateLilypadsAndTicks)
