import { useCallback, useRef, useState } from "react"
import ReadingBlock from "./reading-block"
import QuizSection from "./quiz-section"
import { cn } from "../../../lib/shadcn/utils"

export default function ReadingContainer({ blocks }: { blocks: ContentBlock[] }) {
	const [readingState, setReadingState] = useState<ReadingState>({
		revealedBlocks: [blocks[0].id], // First block always visible
		completedQuizzes: []
	})
	const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const handleContinue = useCallback((blockId: ContentBlockID) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
		if (nextBlock) {
			setReadingState(prev => ({
				...prev,
				revealedBlocks: [...prev.revealedBlocks, nextBlock.id],
			}))
		}
	}, [blocks])

	const handleQuizComplete = useCallback((blockId: ContentBlockID) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined

		setReadingState(prev => ({
			...prev,
			completedQuizzes: [...prev.completedQuizzes, blockId],
			revealedBlocks: nextBlock ? [...prev.revealedBlocks, nextBlock.id] : prev.revealedBlocks,
		}))
		setActiveQuiz(null) // Close quiz section after completion
	}, [blocks])

	const handleQuizOpen = useCallback((blockId: ContentBlockID) => {
		setActiveQuiz({
			blockId,
			questionIndex: 0,
			selectedChoice: null,
			showExplanation: false,
			isReview: readingState.completedQuizzes.includes(blockId)
		})
	}, [readingState.completedQuizzes])

	return (
		<div className="h-full flex relative">
			<div
				className={`h-full transition-all duration-300 ${
					activeQuiz ? "w-2/3" : "w-full"
				}`}
			>
				<div ref={contentRef} className="p-6 h-full overflow-y-auto">
					{blocks.map((block) => (
						<ReadingBlock
							key={block.id}
							block={block}
							blocks={blocks}
							readingState={readingState}
							onContinue={handleContinue}
							onQuizOpen={handleQuizOpen}
						/>
					))}
				</div>
			</div>

			<div
				className={cn(
					"h-full w-1/3 transition-all duration-300 transform",
					activeQuiz ? "translate-x-0" : "translate-x-full",
					"absolute right-0 top-0 border-l-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-gray-900"
				)}
			>
				<QuizSection
					blocks={blocks}
					onQuizComplete={handleQuizComplete}
					activeQuiz={activeQuiz}
					setActiveQuiz={setActiveQuiz}
				/>
			</div>
		</div>
	)
}
