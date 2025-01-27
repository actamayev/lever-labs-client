import ShowLEDLessons from "./led/show-led-lessons"
import Lilypad from "../lab-structure/lilypad/lilypad"
import motorLessons from "./motor/motor-lessons-object"
import { LilypadContainer } from "../lab-structure/lilypad/lilypad-container"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"
import SeeLessonIconsInElement from "../lab-structure/see-lesson-icons-in-element"

export default function Element1() {
	return (
		<div className="h-screen overflow-y-auto">
			<div className="fixed mt-4 flex items-center gap-2 ml-2">
				<NavigateThroughElementsButton />
				<SeeLessonIconsInElement />
			</div>
			<LilypadContainer>
				<ShowLEDLessons />
				<div className="h-full min-h-[600px] w-1 dark:bg-zinc-700 bg-zinc-300 rounded-full" />
				{motorLessons.map((lesson, index) => (
					<div className="mx-10" key={index}>
						<div style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}>
							<Lilypad lesson={lesson} />
						</div>
					</div>
				))}
			</LilypadContainer>
		</div>
	)
}
