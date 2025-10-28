/* eslint-disable max-len */

"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../buttons/tactile-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { Check, X } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import LearnMiniSandbox from "./learn-mini-sandbox"
import { CodingBlock } from "@lever-labs/common-ts/types/learn"
import isEmpty from "lodash-es/isEmpty"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import pipClass from "../../classes/pip-class"
import { cn } from "../../lib/utils"

// eslint-disable-next-line max-lines-per-function, complexity
function LessonFooter({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null
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

	// Get the correct answer for display
	const getCorrectAnswer = (): { codingBlock: CodingBlock; codingBlockId: string } | string | null => {
		if (!currentQuestion) return null

		if (currentQuestion.questionType === "FUNCTION_TO_BLOCK" && currentQuestion.functionToBlockFlashcard) {
			const correctChoice = currentQuestion.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
				(choice): boolean => choice.isCorrect
			)
			return correctChoice ? {
				codingBlock: correctChoice.codingBlock,
				codingBlockId: correctChoice.codingBlock.codingBlockId.toString()
			} : null
		}

		if (currentQuestion.questionType === "BLOCK_TO_FUNCTION" && currentQuestion.blockToFunctionFlashcard) {
			const correctChoice = currentQuestion.blockToFunctionFlashcard.blockToFunctionAnswerChoice.find(
				(choice): boolean => choice.isCorrect
			)
			return correctChoice ? correctChoice.functionDescriptionText : null
		}

		if (currentQuestion.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && currentQuestion.actionToCodeMultipleChoice) {
			const correctChoice = currentQuestion.actionToCodeMultipleChoice.actionToCodeMultipleChoiceAnswerChoice.find(
				(choice): boolean => choice.isCorrect
			)
			return correctChoice ? {
				codingBlock: correctChoice.codingBlock,
				codingBlockId: correctChoice.codingBlock.codingBlockId.toString()
			} : null
		}

		return null
	}

	const correctAnswer = getCorrectAnswer()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCheckClick = async (): Promise<void> => {
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

	const footerBackgroundColor = useMemo((): string => {
		if (!isInConfirmationStage) return ""
		if (lastAnswerWasCorrect) return "bg-question-correct-green border-question-correct-green!"
		return "bg-question-incorrect-red border-question-incorrect-red!"
	}, [isInConfirmationStage, lastAnswerWasCorrect])

	// eslint-disable-next-line complexity
	function ShowIncorrectAnswerContent(): React.ReactNode {
		if (currentQuestion?.questionType === "FILL_IN_BLANK") {
			return (
				<div className="flex items-center gap-3">
					<X className="size-10 text-cardinal" />
					<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
						{currentQuestion.fillInBlankFeedback || "Incorrect. Try again!"}
					</span>
				</div>
			)
		} else if (currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			return (
				<div className="flex items-center gap-3">
					<X className="size-10 text-cardinal" />
					<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
						{currentQuestion.actionToCodeOpenEndedFeedback || "Incorrect. Try again!"}
					</span>
				</div>
			)
		} else if (currentQuestion?.questionType === "FUNCTION_TO_BLOCK") {
			return (
				<div className="flex items-center gap-3">

					<X className="size-10 text-cardinal" />
					<span className="text-3xl font-semibold text-question-incorrect-red-2">Correct solution:</span>
					{correctAnswer && typeof correctAnswer === "object" && (
						<div className="relative h-32 w-96">
							<LearnMiniSandbox
								blocklyJson={correctAnswer.codingBlock.codingBlockJson}
								className="w-full h-full"
							/>
						</div>
					)}
				</div>
			)
		} else if (currentQuestion?.questionType === "BLOCK_TO_FUNCTION") {
			return (
				<div className="flex items-center gap-3">
					<X className="size-10 text-cardinal" />
					<div className="flex flex-col items-center justify-center gap-2">
						<span className="text-3xl font-semibold text-question-incorrect-red-2">Correct solution:</span>
						{correctAnswer && typeof correctAnswer === "string" && (
							<div className="relative h-32 w-96">
								{correctAnswer}
							</div>
						)}
					</div>
				</div>
			)
		} else if (currentQuestion?.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE") {
			return (
				<div className="flex items-center gap-3">
					<X className="size-10 text-cardinal" />
					<span className="text-3xl font-semibold text-question-incorrect-red-2">Correct solution:</span>
					{correctAnswer && typeof correctAnswer === "object" && (
						<div className="relative h-32 w-96">
							<LearnMiniSandbox
								blocklyJson={correctAnswer.codingBlock.codingBlockJson}
								className="w-full h-full"
							/>
						</div>
					)}
				</div>
			)
		}
		return null
	}

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
							buttonText="Send Code"
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

			{/* Right: Check/Continue button */}
			<TactileButton
				onClick={handleCheckClick}
				shadowClass={shadowClass()}
				className={tactileButtonClass()}
				shadowHeight={4}
				disabled={
					(isSubmitting && (currentQuestion?.questionType === "FILL_IN_BLANK" || currentQuestion?.questionType === "ACTION_TO_CODE_OPEN_ENDED")) ||
					(!isInConfirmationStage &&
						!hasSelectedAnswer &&
						currentQuestion?.questionType !== "DEMO" &&
						currentQuestion?.questionType !== "FILL_IN_BLANK" &&
						currentQuestion?.questionType !== "ACTION_TO_CODE_OPEN_ENDED")
				}
			>
				{((): React.ReactNode => {
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
		</footer>
	)
}

export default observer(LessonFooter)
