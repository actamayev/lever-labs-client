/* eslint-disable complexity */
/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../../buttons/tactile-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../../classes/learn-class"
import { useCallback, useState } from "react"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"

// eslint-disable-next-line max-lines-per-function
function CheckContinueButton({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null
	const currentQuestion = learnClass.currentQuestionState?.question
	const isLessonCompleted = learnClass.isLessonCompleted

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCheckClick = async (): Promise<void> => {
		// Handle lesson completion screen - navigate back to learn
		if (isLessonCompleted) {
			learnClass.setIsNavigatingAway(true)
			navigate("/learn")
			// Reset states after navigation has started
			setTimeout((): void => {
				learnClass.resetLessonProgress(lessonId)
				learnClass.setIsLessonCompleted(false)
				learnClass.setIsNavigatingAway(false)
			}, 500) // 500ms to allow the navigation to start
			return
		}

		if (isInConfirmationStage) {
			// For FILL_IN_BLANK and ACTION_TO_CODE_OPEN_ENDED: if incorrect, do not advance; let user try again
			if ((currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && !lastAnswerWasCorrect) {
				learnClass.retryCurrentQuestion()
				return
			}
			learnClass.continueToNextQuestion(lessonId)
			return
		}
		// For demo questions, skip confirmation and go directly to next question
		if (currentQuestion?.questionType === "DEMO") {
			learnClass.continueToNextQuestion(lessonId)
			return
		}
		if (currentQuestion?.questionType !== "FILL_IN_BLANK" && currentQuestion?.questionType !== "ACTION_TO_CODE_OPEN_ENDED") {
			await learnClass.checkCurrentAnswer(lessonId)
			return
		}
		setIsSubmitting(true)
		try {
			await learnClass.checkCurrentAnswer(lessonId)
		} finally {
			setIsSubmitting(false)
		}
	}

	const shadowClass = useCallback((): string => {
		if (!isInConfirmationStage || lastAnswerWasCorrect) {
			return "shadow-charging-green-2"
		}
		return "shadow-cardinal"
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	const tactileButtonClass = useCallback((): string => {
		const baseClass = "h-11 px-12 py-4 text-xl font-semibold rounded-2xl text-standard-background duration-0"
		if (!isInConfirmationStage || lastAnswerWasCorrect) {
			return `${baseClass} bg-charging-green`
		}
		return `${baseClass} bg-cardinal-1`
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	return (
		<TactileButton
			onClick={handleCheckClick}
			shadowClass={shadowClass()}
			className={tactileButtonClass()}
			shadowHeight={4}
			disabled={
				!isLessonCompleted &&
					((isSubmitting && (currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED")) ||
					(!isInConfirmationStage &&
						!hasSelectedAnswer &&
						currentQuestion?.questionType !== "DEMO" &&
						currentQuestion?.questionType !== "FILL_IN_BLANK" &&
						currentQuestion?.questionType !== "ACTION_TO_CODE_OPEN_ENDED"))
			}
		>
			{((): React.ReactNode => {
				if (isLessonCompleted) return "CONTINUE"
				if (isInConfirmationStage) {
					if ((currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && !lastAnswerWasCorrect) return "TRY AGAIN"
					return "CONTINUE"
				}
				if (currentQuestion?.questionType === "DEMO") return "CONTINUE"
				if ((currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && isSubmitting) {
					return (
						<span className="flex items-center gap-2">
							<span>CHECKING</span>
							<span className="flex items-end gap-1">
								<span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
								<span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
								<span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
							</span>
						</span>
					)
				}
				return "CHECK"
			})()}
		</TactileButton>
	)
}

export default observer(CheckContinueButton)
