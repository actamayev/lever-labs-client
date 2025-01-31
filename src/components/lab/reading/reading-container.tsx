import { useEffect, useRef, useState } from "react"
import QuizSection from "./quiz-section"
import ReadingBlock from "./reading-block"
import { cn } from "../../../lib/shadcn/utils"

interface Props {
	blocks: ContentBlock[]
	setReadingProgressPercentage: React.Dispatch<React.SetStateAction<number>>
}

export default function ReadingContainer(props: Props) {
	const { blocks, setReadingProgressPercentage } = props
	const [readingState, setReadingState] = useState<ReadingStateWithAttempts>({
		revealedBlocks: [blocks[0].id],
		completedQuizzes: [],
		quizAttempts: []
	})
	const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const [quizStyle, setQuizStyle] = useState({ top: "5rem", bottom: "0rem" })

	useEffect(() => {
		// Count total required actions (continues + quizzes)
		const totalActions = blocks.length

		// Count completed actions (revealed blocks + completed quizzes)
		const completedActions = readingState.revealedBlocks.length +
            readingState.completedQuizzes.length - 1

		// Calculate percentage
		const percentage = Math.min((completedActions / totalActions) * 100, 100)

		setReadingProgressPercentage(percentage)
		if (percentage !== 100) {
			return setQuizStyle({ top: "5rem", bottom: "0rem" })  // 5rem = 80px (h-20)
		}
		return setQuizStyle({ top: "5rem", bottom: "5rem" })
	}, [blocks.length, readingState.revealedBlocks, readingState.completedQuizzes, setReadingProgressPercentage])

	return (
		<div className="h-full flex relative">
			<div className={cn(
				"h-full transition-all duration-300",
				activeQuiz ? "w-2/3" : "w-full"
			)}>
				<div ref={contentRef} className="px-24 py-6 h-full overflow-y-auto">
					{blocks.map((block) => (
						<ReadingBlock
							key={block.id}
							block={block}
							blocks={blocks}
							readingState={readingState}
							setActiveQuiz={setActiveQuiz}
							setReadingState={setReadingState}
						/>
					))}
				</div>
			</div>

			<div
				className={cn(
					"fixed right-0 inset-y-0 w-1/3 bg-white dark:bg-zinc-900 shadow-lg",
					"transition-transform border-l-2 border-zinc-300 dark:border-zinc-700",
					activeQuiz ? "translate-x-0" : "translate-x-full"
				)}
				style={quizStyle}
			>
				<QuizSection
					blocks={blocks}
					activeQuiz={activeQuiz}
					setActiveQuiz={setActiveQuiz}
					setReadingState={setReadingState}
				/>
			</div>
		</div>
	)
}
