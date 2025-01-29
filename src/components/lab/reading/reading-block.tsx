import { observer } from "mobx-react"
import { CheckCircle } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	block: ContentBlock
	blocks: ContentBlock[]
	readingState: ReadingState
	onContinue: (blockId: ContentBlockID) => void
	onQuizOpen: (blockId: ContentBlockID) => void
}

function ReadingBlock(props: Props) {
	const { block, blocks, readingState, onContinue, onQuizOpen } = props
	const [isContinued, setIsContinued] = useState(false)
	const defaultSiteTheme = useDefaultSiteTheme()

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

	const getShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			if (isQuizCompleted) return "rgb(74, 222, 128)"
			else return "rgb(192 132 252)"
		}
		if (isQuizCompleted) return "rgb(22 163 74)"
		else return "rgb(147 51 234)"
	},[defaultSiteTheme, isQuizCompleted])

	const quizButtonClasses = useMemo(() => {
		if (isQuizCompleted) {
			return "bg-green-100 border-green-400 text-green-800 hover:bg-green-200 \
			dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-800"
		}
		return "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 \
		dark:bg-purple-900 dark:border-purple-600 dark:text-purple-200 dark:hover:bg-purple-800"
	}, [isQuizCompleted])

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
				<TactileButton
					onClick={() => handleContinue(block.id)}
					className="px-6 !py-5 text-xl transition-none border-2
					bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 rounded-2xl
					dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-800"
					shadowColor={defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
				>
					Continue
				</TactileButton>
			)}

			{isRevealed && block.action.type === "quiz" && (
				<TactileButton
					onClick={() => onQuizOpen(block.id)}
					className={cn(
						"px-6 !py-5 text-xl transition-none rounded-2xl border-2",
						quizButtonClasses
					)}
					shadowColor={getShadowColor}
				>
					{!isQuizCompleted ? (
						"Take Quiz"
					) : (
						<>
							<CheckCircle className="w-4 h-4 mr-2" />
							Review Quiz
						</>
					)}
				</TactileButton>
			)}
		</div>
	)
}

export default observer(ReadingBlock)
