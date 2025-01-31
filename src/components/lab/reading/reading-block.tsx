import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import { CheckCircle, StepForward } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { BlueTactileButton } from "../../tactile-buttons"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
	block: ContentBlock
	blocks: ContentBlock[]
	readingState: ReadingStateWithAttempts
	setActiveQuiz: React.Dispatch<React.SetStateAction<ActiveQuiz | null>>
	setReadingState: (value: React.SetStateAction<ReadingStateWithAttempts>) => void
}

// eslint-disable-next-line max-lines-per-function
function ReadingBlock(props: Props) {
	const { block, blocks, readingState, setReadingState, setActiveQuiz } = props
	const [isContinued, setIsContinued] = useState(false)
	const defaultSiteTheme = useDefaultSiteTheme()

	const isRevealed = readingState.revealedBlocks.includes(block.id)
	const isQuizCompleted = readingState.completedQuizzes.includes(block.id)

	const handleQuizOpen = useCallback((blockId: ContentBlockID) => {
		const isReview = readingState.completedQuizzes.includes(blockId)
		const previousAttempt = readingState.quizAttempts.find(attempt => attempt.blockId === blockId)

		setActiveQuiz({
			blockId,
			questionIndex: 0,
			selectedChoice: previousAttempt?.answers[0]?.selectedChoice ?? null,
			showExplanation: isReview,
			isReview,
			previousAnswers: previousAttempt?.answers ?? []
		})
	}, [readingState.completedQuizzes, readingState.quizAttempts, setActiveQuiz])

	const handleContinue = useCallback((blockId: ContentBlockID) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
		if (!nextBlock) return
		// Find the element for the next block
		const nextElement = document.getElementById(`block-${nextBlock.id}`)
		if (nextElement) {
			// Smooth scroll to the next block
			nextElement.scrollIntoView({ behavior: "smooth", block: "start" })
		}
		setReadingState(prev => ({
			...prev,
			revealedBlocks: [...prev.revealedBlocks, nextBlock.id],
		}))
		setIsContinued(true)
	}, [blocks, setReadingState])

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
				<BlueTactileButton
					onClick={() => handleContinue(block.id)}
					className="px-6 !py-5 text-3xl w-full h-16"
					shadowHeight={4}
				>
					<StepForward className="!w-8 !h-8" />
					CONTINUE
				</BlueTactileButton>
			)}

			{isRevealed && block.action.type === "quiz" && (
				<TactileButton
					onClick={() => handleQuizOpen(block.id)}
					className={cn(
						"px-6 !py-5 text-3xl transition-none rounded-2xl border-2 w-full h-16",
						quizButtonClasses
					)}
					shadowColor={getShadowColor}
					shadowHeight={4}
				>
					{!isQuizCompleted ? (
						<>
							<CustomQuiz className="!w-8 !h-8" />
							QUIZ
						</>
					) : (
						<>
							<CheckCircle className="!w-8 !h-8" />
							REVIEW QUIZ
						</>
					)}
				</TactileButton>
			)}
		</div>
	)
}

export default observer(ReadingBlock)
