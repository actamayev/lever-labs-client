
"use client"

import { useMemo } from "react"
import { Check } from "lucide-react"
import { observer } from "mobx-react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { cn } from "../../../lib/utils"
import learnClass from "../../../classes/learn-class"
import CheckContinueButton from "./check-continue-button"
import ShowIncorrectAnswerContent from "./show-incorrect-answer-content"

function LessonFooter({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect

	const footerBackgroundColor = useMemo((): string => {
		if (!isInConfirmationStage) return ""
		if (lastAnswerWasCorrect) return "bg-question-correct-green border-question-correct-green!"
		return "bg-question-incorrect-red border-question-incorrect-red!"
	}, [isInConfirmationStage, lastAnswerWasCorrect])

	return (
		<footer
			className={cn(
				"h-[20vh] border-t-2 border-swan flex items-center justify-between",
				"px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96",
				footerBackgroundColor
			)}
		>
			{/* Left: Empty space (send code button moved to sidebar) */}
			<div className="h-12 w-48" />

			{/* Center: Feedback message (only in confirmation stage) */}
			{isInConfirmationStage && (
				<div className="flex items-center gap-3">
					{lastAnswerWasCorrect ? (
						<>
							<Check className="size-10 text-question-correct-green-2" />
							<span className="text-3xl font-semibold text-question-correct-green-2">Correct!</span>
						</>
					) : (
						<ShowIncorrectAnswerContent />
					)}
				</div>
			)}

			<CheckContinueButton lessonId={lessonId} />
		</footer>
	)
}

export default observer(LessonFooter)
