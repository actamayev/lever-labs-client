import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import { CheckCircle, StepForward } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { BlueTactileButton } from "../../tactile-buttons"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	block: ContentBlock
}

function ReadingBlock(props: Props) {
	const { block  } = props
	const labReadingClass = useLabReadingContext()
	const [isContinued, setIsContinued] = useState(false)
	const defaultSiteTheme = useDefaultSiteTheme()

	const handleQuizOpen = useCallback(() => {
		if (!block.action.quiz) return
		labReadingClass.setActiveQuiz({
			blockId: block.id,
			questionUUID: block.action.quiz.questions[0].questionUUID,
			isCorrect: null,
		})
	}, [block.action.quiz, block.id, labReadingClass])

	const handleContinue = useCallback(() => {
		const nextBlock = labReadingClass.getNextBlock(block.id)
		if (!nextBlock) return
		const nextElement = document.getElementById(`block-${nextBlock.id}`)
		labReadingClass.setShownBlocks(nextBlock.id)
		setIsContinued(true)
		if (nextElement) {
			nextElement.scrollIntoView({ behavior: "smooth", block: "start" })
		}
	}, [block.id, labReadingClass])

	const isQuizCorrect = labReadingClass.activeQuiz?.isCorrect

	const getShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			if (isQuizCorrect) return "rgb(74, 222, 128)"
			else return "rgb(192 132 252)"
		}
		if (isQuizCorrect) return "rgb(22 163 74)"
		else return "rgb(147 51 234)"
	},[defaultSiteTheme, isQuizCorrect])

	const quizButtonClasses = useMemo(() => {
		if (isQuizCorrect) {
			return "bg-green-100 border-green-400 text-green-800 hover:bg-green-200 \
			dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-800"
		}
		return "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 \
		dark:bg-purple-900 dark:border-purple-600 dark:text-purple-200 dark:hover:bg-purple-800"
	}, [isQuizCorrect])

	const isRevealed = useMemo(() => {
		return labReadingClass.checkIfBlockIsShown(block.id)
	}, [block.id, labReadingClass])

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
					onClick={handleContinue}
					className="px-6 !py-5 text-3xl w-full h-16"
					shadowHeight={4}
				>
					<StepForward className="!w-8 !h-8" />
					CONTINUE
				</BlueTactileButton>
			)}

			{isRevealed && block.action.type === "quiz" && (
				<TactileButton
					onClick={handleQuizOpen}
					className={cn(
						"px-6 !py-5 text-3xl transition-none rounded-2xl border-2 w-full h-16",
						quizButtonClasses
					)}
					shadowColor={getShadowColor}
					shadowHeight={4}
				>
					{!isQuizCorrect ? (
						<><CustomQuiz className="!w-8 !h-8" />QUIZ</>
					) : (
						<><CheckCircle className="!w-8 !h-8" />REVIEW QUIZ</>
					)}
				</TactileButton>
			)}
		</div>
	)
}

export default observer(ReadingBlock)
