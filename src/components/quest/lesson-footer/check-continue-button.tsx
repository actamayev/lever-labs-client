/* eslint-disable complexity */
/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../../buttons/tactile-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import questClass from "../../../classes/quest-class"
import { useCallback, useState } from "react"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { stripAndNormalizeJson } from "../../../utils/blockly/strip-blockly-positions"
import CustomTooltip from "../../custom-tooltip"

// eslint-disable-next-line max-lines-per-function
function CheckContinueButton({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = questClass.lastAnswerWasCorrect
	const hasSelectedAnswer = questClass.currentQuestionState?.selectedAnswerId !== null
	const currentQuestion = questClass.currentQuestionState?.question
	const isLessonCompleted = questClass.isLessonCompleted

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCheckClick = async (): Promise<void> => {
		// Handle lesson completion screen - navigate back to learn
		if (isLessonCompleted) {
			questClass.setIsNavigatingAway(true)
			navigate("/quest")
			// Reset states after navigation has started
			setTimeout((): void => {
				questClass.resetLessonProgress(lessonId)
				questClass.setIsLessonCompleted(false)
				questClass.setIsNavigatingAway(false)
			}, 500) // 500ms to allow the navigation to start
			return
		}

		if (isInConfirmationStage) {
			// For FILL_IN_BLANK and ACTION_TO_CODE_OPEN_ENDED: if incorrect, do not advance; let user try again
			if ((currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && !lastAnswerWasCorrect) {
				questClass.retryCurrentQuestion()
				return
			}
			await questClass.continueToNextQuestion(lessonId)
			return
		}

		if (currentQuestion?.questionType !== "FILL_IN_BLANK" && currentQuestion?.questionType !== "ACTION_TO_CODE_OPEN_ENDED") {
			await questClass.checkCurrentAnswer(lessonId)
			return
		}
		setIsSubmitting(true)
		try {
			await questClass.checkCurrentAnswer(lessonId)
		} finally {
			setIsSubmitting(false)
		}
	}

	const hasCodeChanged = useCallback((): boolean => {
		if (!currentQuestion) return false

		const isOpenEndedQuestion = currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED"
		if (!isOpenEndedQuestion) return true

		let currentJson = {}
		let initialJson = {}

		if (currentQuestion.questionType === "FILL_IN_BLANK") {
			currentJson = currentQuestion.fillInBlankAnswer?.blocklyJson || {}
			initialJson = currentQuestion.fillInTheBlank?.initialBlocklyJson || {}
		} else if (currentQuestion.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			currentJson = currentQuestion.actionToCodeOpenEndedAnswer?.blocklyJson || {}
			initialJson = currentQuestion.actionToCodeOpenEnded?.initialBlocklyJson || {}
		}

		const currentJsonStripedAndNormalized = stripAndNormalizeJson(currentJson)
		const initialJsonStripedAndNormalized = stripAndNormalizeJson(initialJson)

		return JSON.stringify(currentJsonStripedAndNormalized) !== JSON.stringify(initialJsonStripedAndNormalized)
	}, [currentQuestion])

	const isDisabled = useCallback((): boolean => {
		if (isLessonCompleted) return false

		const isOpenEndedQuestion = currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED"

		if (isOpenEndedQuestion && isSubmitting) return true

		// For open-ended questions, check if code has changed and been sent
		if (isOpenEndedQuestion && !isInConfirmationStage) {
			// Disable if code hasn't changed from initial state
			if (!hasCodeChanged()) {
				return true
			}

			// Disable if code hasn't been sent yet
			if (!questClass.hasCodeBeenSentForCurrentQuestion()) {
				return true
			}
		}

		if (!isInConfirmationStage && !isOpenEndedQuestion && !hasSelectedAnswer) {
			return true
		}

		return false
	}, [isLessonCompleted, currentQuestion, isSubmitting, isInConfirmationStage, hasSelectedAnswer, hasCodeChanged])

	const shouldShowTooltip = useCallback((): boolean => {
		if (isLessonCompleted) return false
		if (isInConfirmationStage) return false

		const isOpenEndedQuestion = currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED"
		if (!isOpenEndedQuestion) return false

		// Show tooltip if code hasn't changed or code hasn't been sent
		return !hasCodeChanged() || !questClass.hasCodeBeenSentForCurrentQuestion()
	}, [isLessonCompleted, isInConfirmationStage, currentQuestion, hasCodeChanged])

	const getTooltipMessage = useCallback((): string => {
		const isOpenEndedQuestion = currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED"
		if (!isOpenEndedQuestion) return ""

		// Check if code hasn't changed
		if (!hasCodeChanged()) {
			return "Please modify the starter code before checking your answer"
		}

		// Check if code hasn't been sent
		if (!questClass.hasCodeBeenSentForCurrentQuestion()) {
			return "Please send your code to Pip before checking your answer"
		}

		return ""
	}, [currentQuestion, hasCodeChanged])

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

	const buttonContent = (): React.ReactNode => {
		if (isLessonCompleted) return "CONTINUE"
		if (isInConfirmationStage) {
			if ((currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") && !lastAnswerWasCorrect) return "TRY AGAIN"
			return "CONTINUE"
		}
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
	}

	const button = (
		<TactileButton
			onClick={handleCheckClick}
			shadowClass={shadowClass()}
			className={tactileButtonClass()}
			shadowHeight={4}
			disabled={isDisabled()}
		>
			{buttonContent()}
		</TactileButton>
	)

	if (shouldShowTooltip()) {
		return (
			<CustomTooltip
				tooltipTrigger={
					<div className="relative inline-block">
						{button}
						{/* Invisible overlay for tooltip when disabled */}
						<div className="absolute inset-0 cursor-not-allowed" />
					</div>
				}
				tooltipContent={getTooltipMessage()}
				contentSide="top"
			/>
		)
	}

	return button
}

export default observer(CheckContinueButton)
