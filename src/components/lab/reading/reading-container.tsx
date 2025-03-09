import { toJS } from "mobx"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import QuizSection from "./quiz-section"
import ReadingBlock from "./reading-block"
import { cn } from "../../../lib/shadcn/utils"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	blocks: ContentBlock[]
	readingName: ReadingNames
}

function ReadingContainer({ blocks, readingName } : Props) {
	const labReadingClass = useLabReadingContext()
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		labReadingClass.setBlocks(blocks, readingName)
		labReadingClass.setShownBlocks(blocks[0].id)
	}, [blocks, readingName, labReadingClass])

	return (
		<div className="h-full flex relative">
			<div className={cn(
				"h-full transition-all duration-300",
				labReadingClass.activeQuiz ? "w-2/3" : "w-full"
			)}>
				<div
					ref={contentRef}
					className={cn(
						"reading-content-container py-6 h-full overflow-y-auto",
						labReadingClass.activeQuiz ? "px-20" : "px-64"
					)}
				>
					{labReadingClass.shownBlocks.map((block) => (
						<ReadingBlock key={block.id} block={block} />
					))}
				</div>
			</div>

			<div
				className={cn(
					"fixed right-0 inset-y-0 w-1/3 bg-standardBackground",
					"transition-transform shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)]",
					labReadingClass.activeQuiz ? "translate-x-0" : "translate-x-full"
				)}
				style={toJS(labReadingClass.quizStyle)}
			>
				<QuizSection />
			</div>
		</div>
	)
}

export default observer(ReadingContainer)
