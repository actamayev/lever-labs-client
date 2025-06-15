"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { CheckCircle } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { CustomQuiz } from "../../icons/custom-quiz"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import labReadingClass from "../../../classes/lab-reading-class"
import personalInfoClass from "../../../classes/personal-info-class"

function QuizButton({ block } : { block: ContentBlock }) {
	const isQuizCorrect = labReadingClass.areQuizzesInBlockCorrect(block.id)

	const quizShadowColor = useMemo(() => {
		if (personalInfoClass.defaultSiteTheme === "light") {
			if (isQuizCorrect) return "rgb(74, 222, 128)"
			else return "rgb(192 132 252)"
		}
		if (isQuizCorrect) return "rgb(22 163 74)"
		else return "rgb(147 51 234)"
	}, [isQuizCorrect])

	const quizButtonClasses = useMemo(() => {
		if (isQuizCorrect) {
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
		}
		return "bg-purple-100 text-purple-800 \
			dark:bg-purple-900 dark:text-purple-200"
	}, [isQuizCorrect])

	return (
		<TactileButton
			onClick={() => labReadingClass.openQuiz(block)}
			className={cn(
				"px-6 !py-5 text-3xl duration-150 rounded-2xl border-2 w-full h-16",
				quizButtonClasses
			)}
			shadowColor={quizShadowColor}
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
