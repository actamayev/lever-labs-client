import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import isUndefined from "lodash-es/isUndefined"
import { CheckCircle, StepForward } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { CustomWizardHat } from "../../icons/custom-wizard-hat"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"
import { usePageTransitionContext } from "../../../contexts/page-transition-context"

// eslint-disable-next-line complexity, max-lines-per-function
function ReadingBlock({ block } : { block: ContentBlock }) {
	const labReadingClass = useLabReadingContext()
	const [isContinued, setIsContinued] = useState(false)
	const defaultSiteTheme = useDefaultSiteTheme()
	const navigate = useTypedNavigate()
	const pageTransitionClass = usePageTransitionContext()

	const isQuizCorrect = labReadingClass.areQuizesInBlockCorrect(block.id)

	const quizShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			if (isQuizCorrect) return "rgb(74, 222, 128)"
			else return "rgb(192 132 252)"
		}
		if (isQuizCorrect) return "rgb(22 163 74)"
		else return "rgb(147 51 234)"
	}, [defaultSiteTheme, isQuizCorrect])

	const demoShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			return "rgb(250 204 21)"
		}
		return "rgb(202 138 4)"
	}, [defaultSiteTheme])

	const quizButtonClasses = useMemo(() => {
		if (isQuizCorrect) {
			return "bg-green-100 border-green-400 text-green-800 hover:bg-green-50 \
			dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
		}
		return "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-50 \
		dark:bg-purple-900 dark:border-purple-600 dark:text-purple-200 dark:hover:bg-purple-950"
	}, [isQuizCorrect])

	const demoClasses = useMemo(() => {
		return "bg-yellow-100 border-yellow-400 text-yellow-800 hover:bg-yellow-50 \
		dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200 dark:hover:bg-yellow-950"
	}, [])

	const isRevealed = useMemo(() => {
		return labReadingClass.checkIfBlockIsShown(block.id)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [block.id, labReadingClass.shownBlocks])

	const navigateToDemo = useCallback(() => {
		pageTransitionClass.setDirection("left") // Set before navigating
		setTimeout(() => navigate(block.action.demoLink as LabPages), 10) // Small delay ensures state update
		labReadingClass.handleDemoComplete(block.id)
	}, [block.action.demoLink, block.id, labReadingClass, navigate, pageTransitionClass])

	return (
		<div
			key={block.id}
			id={`block-${block.id}`}
			className={cn(
				"flex flex-col mb-6 transition-opacity duration-300",
				isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
				labReadingClass.getBlockHeightState(block.id)
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
						shadowColor={quizShadowColor}
						shadowHeight={4}
					>
						{!isQuizCorrect ? (
							<><CustomQuiz className="!w-8 !h-8" />QUIZ</>
						) : (
							<><CheckCircle className="!w-8 !h-8" />REVIEW QUIZ</>
						)}
					</TactileButton>
				)}

				{isRevealed && !isUndefined(block.action.demoLink) && block.action.type === "demo" && (
					<TactileButton
						onClick={navigateToDemo}
						className={cn(
							"px-6 !py-5 text-3xl transition-none rounded-2xl border-2 w-full h-16",
							demoClasses
						)}
						shadowColor={demoShadowColor}
						shadowHeight={4}
					>
						<><CustomWizardHat className="!w-8 !h-8" />DEMO</>
					</TactileButton>
				)}
			</div>
		</div>
	)
}

export default observer(ReadingBlock)
