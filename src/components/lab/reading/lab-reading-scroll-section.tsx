import { useCallback, useRef, useState } from "react"
import QuizSection from "./quiz-section"
import ReadingBlock from "./reading-block"
import { cn } from "../../../lib/shadcn/utils"

export default function ReadingContainer ({ blocks } : { blocks: ContentBlock[] }) {
	const [readingState, setReadingState] = useState<ReadingState>({
		revealedBlocks: [blocks[0].id], // First block always visible
		completedQuizzes: []
	})
	const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz| null>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const handleContinue = useCallback((blockId: string) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
		if (nextBlock) {
			setReadingState(prev => ({
				...prev,
				revealedBlocks: [...prev.revealedBlocks, nextBlock.id],
			}))
		}
	}, [blocks])

	const handleQuizComplete = useCallback((blockId: string) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined

		setReadingState(prev => ({
			...prev,
			completedQuizzes: [...prev.completedQuizzes, blockId],
			revealedBlocks: nextBlock ? [...prev.revealedBlocks, nextBlock.id] : prev.revealedBlocks,
		}))
	}, [blocks])

	return (
		<div className="h-full flex">
			<div className="w-2/3 h-full overflow-y-auto border-r-2 border-zinc-300 dark:border-zinc-700">
				<div ref={contentRef} className="p-6">
					{blocks.map((block) => (
						<ReadingBlock
							key={block.id}
							block={block}
							blocks={blocks}
							readingState={readingState}
							onContinue={handleContinue}
						/>
					))}
				</div>
			</div>

			<div className={cn(
				"fixed right-0 top-20 bottom-20 w-1/3 bg-white dark:bg-gray-900 shadow-lg transition-transform",
				activeQuiz ? "translate-x-0" : "translate-x-full"
			)}>
				<QuizSection
					blocks={blocks}
					readingState={readingState}
					onQuizComplete={handleQuizComplete}
					activeQuiz={activeQuiz}
					setActiveQuiz={setActiveQuiz}
				/>
			</div>
		</div>
	)
}
