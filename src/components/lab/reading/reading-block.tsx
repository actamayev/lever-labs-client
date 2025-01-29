import { useCallback } from "react"

interface Props {
	block: ContentBlock
	blocks: ContentBlock[]
	readingState: ReadingState
	onContinue: (blockId: string) => void
	onQuizComplete: (blockId: string) => void
}

export default function ReadingBlock(props: Props) {
	const { block, blocks, readingState, onContinue, onQuizComplete } = props

	const isRevealed = readingState.revealedBlocks.includes(block.id)
	const isQuizCompleted = readingState.completedQuizzes.includes(block.id)

	const handleContinue = useCallback((blockId: string) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
		if (nextBlock) {
			// Find the element for the next block
			const nextElement = document.getElementById(`block-${nextBlock.id}`)
			if (nextElement) {
				// Smooth scroll to the next block
				nextElement.scrollIntoView({ behavior: "smooth", block: "start" })
			}
		}
		onContinue(blockId)
	}, [blocks, onContinue])

	return (
		<div
			key={block.id}
			id={`block-${block.id}`}
			className={`mb-6 transition-opacity duration-300 ${isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
		>
			<div className="prose dark:prose-invert max-w-none">
				{block.text}
			</div>

			{isRevealed && block.action.type === "continue" && (
				<button
					onClick={() => handleContinue(block.id)}
					className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
				>
					Continue
				</button>
			)}

			{isRevealed && block.action.type === "quiz" && !isQuizCompleted && (
				<button
					onClick={() => onQuizComplete(block.id)}
					className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
				>
					Take Quiz
				</button>
			)}

			{isQuizCompleted && (
				<div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
					Quiz Completed ✓
				</div>
			)}
		</div>
	)
}
