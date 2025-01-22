import Lilypad from "../lilypad"
import NavigateThroughElementsButton from "../navigate-through-elements-button"

interface Lessons {
	progress: number | null
	url: LabPages
	title: string
}

export default function Element1() {
	const ledLessons: Lessons[] = [
		{ progress: 0, url: "/lab/element-1/start", title: "Start" },
		{ progress: 0, url: "/lab/element-1/led/reading", title: "What is an LED?" },
		{ progress: null, url: "/lab/element-1/led/video", title: "Video title" },
		{ progress: null, url: "/lab/element-1/led/video", title: "Optional bubble" },
		{ progress: null, url: "/lab/element-1/led/code", title: "LED Code 1" },
		{ progress: null, url: "/lab/element-1/led/code", title: "LED Code 2" },
		{ progress: null, url: "/lab/element-1/led/code", title: "LED Code 3" },
	]

	return (
		<div>
			<NavigateThroughElementsButton />

			{/* Scrollable Lilypads Container */}
			<div className="pt-32 px-8">
				<div className="relative w-full overflow-x-auto pb-8">
					<div className="flex space-x-24 min-w-max px-8">
						{ledLessons.map((lesson, index) => (
							<div key={index}>
								<Lilypad
									lessonProgress={lesson.progress}
									lessonUrl={lesson.url as LabPages}
									lessonName={lesson.title}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
