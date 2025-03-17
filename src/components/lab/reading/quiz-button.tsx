"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { CheckCircle } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

function QuizButton({ block } : { block: ContentBlock }) {
	const labReadingClass = useLabReadingContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	const isQuizCorrect = labReadingClass.areQuizesInBlockCorrect(block.id)

	const quizShadowColor = useMemo(() => {
		if (defaultSiteTheme === "light") {
			if (isQuizCorrect) return "rgb(74, 222, 128)"
			else return "rgb(192 132 252)"
		}
		if (isQuizCorrect) return "rgb(22 163 74)"
		else return "rgb(147 51 234)"
	}, [defaultSiteTheme, isQuizCorrect])

	const quizButtonClasses = useMemo(() => {
		if (isQuizCorrect) {
			return "bg-green-100 border-green-400 text-green-800 hover:bg-green-50 \
				dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
		}
		return "bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-50 \
			dark:bg-purple-900 dark:border-purple-600 dark:text-purple-200 dark:hover:bg-purple-950"
	}, [isQuizCorrect])

	return (
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
	)
}

export default observer(QuizButton)
