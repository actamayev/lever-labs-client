
"use client"

import { observer } from "mobx-react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../../classes/learn-class"
import { Check } from "lucide-react"
import { useMemo } from "react"
import isEmpty from "lodash-es/isEmpty"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import pipClass from "../../../classes/pip-class"
import { cn } from "../../../lib/utils"
import CheckContinueButton from "./check-continue-button"
import ShowIncorrectAnswerContent from "./show-incorrect-answer-content"

function LessonFooter({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const currentQuestion = learnClass.currentQuestionState?.question
	const getCurrentCppCode = (): string => {
		if (!currentQuestion) return ""
		if (currentQuestion.questionType === "FILL_IN_BLANK") {
			return currentQuestion.fillInBlankAnswer?.cppCode || ""
		}
		if (currentQuestion.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			return currentQuestion.actionToCodeOpenEndedAnswer?.cppCode || ""
		}
		return ""
	}
	const currentCppCode = getCurrentCppCode()
	const isSendDisabled = isEmpty(currentCppCode) || pipClass.isSendingCppToPip

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
			{/* Left: Send Code button for Fill-In-The-Blank and Action-To-Code-Open-Ended */}
			<div className="h-12 w-48">
				{(currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && (
					<div className="w-48 h-12">
						<AnimatedStateButton
							buttonText="SEND CODE"
							isDisabled={isSendDisabled}
							onClick={async (event): Promise<void> => {
								await sendCppToPip(currentCppCode, (event.currentTarget as HTMLButtonElement).getBoundingClientRect())
							}}
							className="text-lg"
						/>
					</div>
				)}
			</div>

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
