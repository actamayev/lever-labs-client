import { observer } from "mobx-react"
import { useMemo, useState } from "react"
import { CheckCircle, StepForward } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
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

	const isQuizCorrect = labReadingClass.areQuizesInBlockCorrect(block.id)

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

	const viewHeightClasses = () => {
		if (labReadingClass.isLastBlockOfActiveBlocks(block.id)) return "min-h-0]"
		if (labReadingClass.isBlockLastShown(block.id)) return "min-h-[calc(80vh)]"
		return "min-h-[calc(40vh)]"
	}

	return (
		<div
			key={block.id}
			id={`block-${block.id}`}
			className={cn(
				"flex flex-col mb-6 transition-opacity duration-300",
				isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
				viewHeightClasses()
			)}
		>
			{block.text}

			<div>
				{isRevealed && block.action.type === "continue" && !isContinued && (
					<BlueTactileButton
						onClick={() => labReadingClass.handleContinue(block.id, setIsContinued)}
						className="px-6 !py-5 text-3xl w-full h-16"
						shadowHeight={4}
					>
						<StepForward className="!w-8 !h-8" />
                        CONTINUE
					</BlueTactileButton>
				)}

				{isRevealed && block.action.type === "quiz" && (
					<TactileButton
						onClick={() => labReadingClass.openQuiz(block)}
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
		</div>
	)
}

export default observer(ReadingBlock)
