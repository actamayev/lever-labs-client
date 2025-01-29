import { useCallback, useState } from "react"
import { Button } from "../../shadcn/ui/button"
import { Card, CardContent } from "../../shadcn/ui/card"

interface Props {
	block: ContentBlock
	blocks: ContentBlock[]
	readingState: ReadingState
	onContinue: (blockId: string) => void
}

export default function ReadingBlock(props: Props) {
	const { block, blocks, readingState, onContinue } = props
	const [isContinued, setIsContinued] = useState(false)

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
		setIsContinued(true)
	}, [blocks, onContinue])

	return (
		<div
			key={block.id}
			id={`block-${block.id}`}
			className={`mb-6 transition-opacity duration-300 ${isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
		>
			<div className="max-w-none">
				{block.text}
			</div>

			{isRevealed && block.action.type === "continue" && !isContinued && (
				<Button
					onClick={() => handleContinue(block.id)}
					className="px-6 !py-5 text-xl bg-pipTheme text-white hover:bg-pipThemeHover transition-none rounded-2xl"
					variant="tactile"
				>
					Continue
				</Button>
			)}

			{isRevealed && block.action.type === "quiz" && !isQuizCompleted && (
				<Card className="bg-zinc-100 dark:bg-zinc-900">
					<CardContent className="flex item-center justify-center mt-2">
						Take Quiz
					</CardContent>
				</Card>
			)}

			{isQuizCompleted && (
				<div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
					Quiz Completed ✓
				</div>
			)}
		</div>
	)
}
