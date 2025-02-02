import { toJS } from "mobx"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import QuizSection from "./quiz-section"
import ReadingBlock from "./reading-block"
import { cn } from "../../../lib/shadcn/utils"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	blocks: ContentBlock[]
	labLesson: Element1Lessons
}

function ReadingContainer({ blocks, labLesson } : Props) {
	const labReadingClass = useLabReadingContext()
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		labReadingClass.setBlocks(blocks, labLesson)
		labReadingClass.setShownBlocks(blocks[0].id)
	}, [blocks, labLesson, labReadingClass])

	return (
		<div className="h-full flex relative">
			<div className={cn(
				"h-full transition-all duration-300",
				labReadingClass.activeQuiz ? "w-2/3" : "w-full"
			)}>
				<div ref={contentRef} className="px-24 py-6 h-full overflow-y-auto">
					{labReadingClass.shownBlocks.map((block) => (
						<ReadingBlock key={block.id} block={block} />
					))}
				</div>
			</div>

			<div
				className={cn(
					"fixed right-0 inset-y-0 w-1/3 bg-white dark:bg-zinc-900 shadow-lg",
					"transition-transform border-l-2 border-zinc-300 dark:border-zinc-700",
					labReadingClass.activeQuiz ? "translate-x-0" : "translate-x-full"
				)}
				style={toJS(labReadingClass.quizStyle)}
			>
				{labReadingClass.activeQuiz && <QuizSection />}
			</div>
		</div>
	)
}

export default observer(ReadingContainer)
