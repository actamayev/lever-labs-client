import Lilypad from "../lab-structure/lilypad"
import ledLessons from "./led/led-lessons-object"
import motorLessons from "./motor/motor-lessons-object"
import { LilypadContainer, LilypadSection } from "../lab-structure/lilypad-container"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

export default function Element1() {
	return (
		<div className="pt-8 h-screen overflow-y-auto">
			<NavigateThroughElementsButton />
			{/* Scrollable Lilypads Container */}
			<LilypadContainer>
				<LilypadSection>
					{ledLessons.map((lesson, index) => (
						<div
							key={index}
							style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}
						>
							<Lilypad lesson={lesson}/>
						</div>
					))}
				</LilypadSection>
				<div className="h-full min-h-[600px] w-1 dark:bg-zinc-700 bg-zinc-300 rounded-full" />
				<LilypadSection>
					{motorLessons.map((lesson, index) => (
						<div
							key={index}
							style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}
						>
							<Lilypad lesson={lesson} />
						</div>
					))}
				</LilypadSection>
			</LilypadContainer>
		</div>
	)
}
