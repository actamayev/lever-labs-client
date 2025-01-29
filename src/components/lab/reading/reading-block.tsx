import { CheckCircle } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"

interface Props {
  block: ContentBlock
  blocks: ContentBlock[]
  readingState: ReadingState
  onContinue: (blockId: ContentBlockID) => void
  onQuizOpen: (blockId: ContentBlockID) => void
}

export default function ReadingBlock(props: Props) {
	const { block, blocks, readingState, onContinue, onQuizOpen } = props
	const [isContinued, setIsContinued] = useState(false)

	const isRevealed = readingState.revealedBlocks.includes(block.id)
	const isQuizCompleted = readingState.completedQuizzes.includes(block.id)

	const handleContinue = useCallback((blockId: ContentBlockID) => {
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
			className={cn(
				"mb-6 transition-opacity duration-300",
				isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
			)}
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

			{isRevealed && block.action.type === "quiz" && (
				<Button
					onClick={() => onQuizOpen(block.id)}
					className={cn(
						"mt-4",
						isQuizCompleted ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-blue-500 text-white hover:bg-blue-600"
					)}
				>
					{isQuizCompleted ? (
						<>
							<CheckCircle className="w-4 h-4 mr-2" />
							Review Quiz
						</>
					) : (
						"Take Quiz"
					)}
				</Button>
			)}
		</div>
	)
}
