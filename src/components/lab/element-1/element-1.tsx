import { useEffect, useRef, useState } from "react"
import ShowLEDLessons from "./led/show-led-lessons"
import Lilypad from "../lab-structure/lilypad/lilypad"
import motorLessons from "./motor/motor-lessons-object"
import { LilypadContainer } from "../lab-structure/lilypad/lilypad-container"
import SeeLessonIconsInElement from "../lab-structure/see-lesson-icons-in-element"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

interface Section {
	ref: React.RefObject<HTMLDivElement>
	name: Element1Sections
}

export default function Element1() {
	const ledSectionRef = useRef<HTMLDivElement>(null)
	const motorSectionRef = useRef<HTMLDivElement>(null)
	const [activeSection, setActiveSection] = useState<Element1Sections>("LED")

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
								setActiveSection(name)
							}
						})
					},
					{ threshold: 0.75 }
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
		<div className="h-screen overflow-y-auto">
			<div className="fixed mt-4 flex items-center gap-2 ml-2">
				<NavigateThroughElementsButton />
				<SeeLessonIconsInElement
					sectionRefs={{
						LED: ledSectionRef,
						Motor: motorSectionRef
					}}
					activeSection={activeSection}
				/>
			</div>
			<LilypadContainer>
				<div ref={ledSectionRef} className="flex">
					<ShowLEDLessons />
				</div>
				<div className="h-full min-h-[600px] w-1 dark:bg-zinc-700 bg-zinc-300 rounded-full" />
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
