import Lilypad from "../lilypad"
import NavigateThroughElementsButton from "../navigate-through-elements-button"

export default function Element1() {
	const lessons = [
		{ progress: 100, url: "/lab/element-1/start" },
		{ progress: 75, url: "/lab/element-1/lesson-2" },
		{ progress: null, url: "/lab/element-1/lesson-3" },
		{ progress: null, url: "/lab/element-1/lesson-4" },
		{ progress: null, url: "/lab/element-1/lesson-5" },
		{ progress: null, url: "/lab/element-1/lesson-6" },
		{ progress: null, url: "/lab/element-1/lesson-6" },
		{ progress: null, url: "/lab/element-1/lesson-6" },
		{ progress: null, url: "/lab/element-1/lesson-6" },
		{ progress: null, url: "/lab/element-1/lesson-6" },

	]

	return (
		<div className="">
			<NavigateThroughElementsButton />

			{/* Scrollable Lilypads Container */}
			<div className="pt-32 px-8">
				<div className="relative w-full overflow-x-auto pb-8">
					<div className="flex space-x-24 min-w-max px-8">
						<div
							className="absolute top-1/2 left-0 w-full h-0 border-t-2
							border-dotted border-green-200 -translate-y-1/2"
						/>

						{/* Lilypads */}
						{lessons.map((lesson, index) => (
							<div key={index} className="relative z-10">
								<Lilypad
									lessonProgress={lesson.progress}
									lessonUrl={lesson.url as LabPages}
									lessonName="Test"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
