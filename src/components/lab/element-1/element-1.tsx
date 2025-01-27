import { useRef, useState } from "react"
import ShowLEDLessons from "./led/show-led-lessons"
import Lilypad from "../lab-structure/lilypad/lilypad"
import motorLessons from "./motor/motor-lessons-object"
import { LilypadContainer } from "../lab-structure/lilypad/lilypad-container"
import SeeLessonIconsInElement from "../lab-structure/see-lesson-icons-in-element"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

export default function Element1() {
	const ledSectionRef = useRef<HTMLDivElement>(null)
	const motorSectionRef = useRef<HTMLDivElement>(null)
	const [clickedSection, setClickedSection] = useState<Element1Sections>("LED")

	return (
		<div className="h-screen overflow-y-auto">
			<div className="fixed mt-4 flex items-center gap-2 ml-2">
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
