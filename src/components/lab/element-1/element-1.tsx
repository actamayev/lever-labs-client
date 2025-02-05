import { useEffect, useRef, useState } from "react"
import ShowLEDLessons from "./led/show-led-lessons"
import Lilypad from "../lab-structure/lilypad/lilypad"
import Element1StartCard from "./start-card/element-1-start-card"
import motorLessons from "./motor/motor-lessons-object"
import LabVerticalDivider from "../lab-structure/lab-vertical-divider"
import { LilypadContainer } from "../lab-structure/lilypad/lilypad-container"
import SeeLessonIconsInElement from "../lab-structure/see-lesson-icons-in-element"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

interface Section {
	ref: React.RefObject<HTMLDivElement>
	name: Element1Lessons
}

export default function Element1() {
	const ledSectionRef = useRef<HTMLDivElement>(null)
	const motorSectionRef = useRef<HTMLDivElement>(null)
	const [clickedSection, setClickedSection] = useState<Element1Lessons>("LED")

	useEffect(() => {
		const observers: IntersectionObserver[] = []
		const sections: Section[] = [
			{ ref: ledSectionRef, name: "LED" },
			{ ref: motorSectionRef, name: "Motor" }
		]

		sections.forEach(({ ref, name }) => {
			if (ref.current) {
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								setClickedSection(name)
							}
						})
					},
					{ threshold: 0.5 }
				)

				observer.observe(ref.current)
				observers.push(observer)
			}
		})

		return () => {
			observers.forEach(observer => observer.disconnect())
		}
	}, [])

	return (
		<div className="h-screen overflow-y-auto relative">
			<div className="fixed mt-6 ml-2 flex flex-row items-start gap-4 z-50">
				<NavigateThroughElementsButton />
				<SeeLessonIconsInElement
					sectionRefs={{
						LED: ledSectionRef,
						Motor: motorSectionRef
					}}
					activeSection={clickedSection}
					setClickedSection={setClickedSection}
				/>
			</div>
			<LilypadContainer>
				<Element1StartCard />
				{/* Alter this pl-32 for the auto-scroll to scroll to the correct place (need to adjust for the sidebar width) */}
				<div ref={ledSectionRef} className="flex pl-32">
					<ShowLEDLessons />
				</div>
				<LabVerticalDivider />
				<div ref={motorSectionRef} className="flex">
					{motorLessons.map((lesson, index) => (
						<div className="mx-10" key={index}>
							<div style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}>
								<Lilypad lesson={lesson} />
							</div>
						</div>
					))}
				</div>
			</LilypadContainer>
		</div>
	)
}
