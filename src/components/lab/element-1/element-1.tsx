import Lilypad from "../lab-structure/lilypad/lilypad"
import ledLessons from "./led/led-lessons-object"
import motorLessons from "./motor/motor-lessons-object"
import setLessonVerticalPosition from "../../../utils/lab/set-lesson-vertical-position"
import { LilypadContainer } from "../lab-structure/lilypad/lilypad-container"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"
import { cn } from "../../../lib/shadcn/utils"

export default function Element1() {
	return (
		<div className="pt-8 h-screen overflow-y-auto">
			<NavigateThroughElementsButton />
			<LilypadContainer>
				{ledLessons.map((lesson, index) => (
					<div
						className={cn(
							"flex",
							lesson.needsleftXMargin === false ? "mr-0" : "mr-20"
						)}
						key={index}
					>
						<div style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}>
							<Lilypad lesson={lesson}/>
						</div>
					</div>
				))}
				<div className="h-full min-h-[600px] w-1 dark:bg-zinc-700 bg-zinc-300 rounded-full" />
				{motorLessons.map((lesson, index) => (
					<div
						className=""
						key={index}
					>
						<div style={{ marginTop: setLessonVerticalPosition(lesson.verticalPosition)}}>
							<Lilypad lesson={lesson} />
						</div>
					</div>
				))}
			</LilypadContainer>
		</div>
	)
}
