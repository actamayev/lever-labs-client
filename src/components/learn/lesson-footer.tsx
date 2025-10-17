
"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
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
import { cn } from "../../lib/shadcn/utils"

// eslint-disable-next-line max-lines-per-function, complexity
function LessonFooter({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null
	const currentQuestion = learnClass.currentQuestionState?.question
	const currentCppCode = currentQuestion?.questionType === "FILL_IN_BLANK"
		? (currentQuestion.fillInBlankAnswer?.cppCode || "")
		: ""
	const isSendDisabled = isEmpty(currentCppCode) || pipClass.isSendingCppToPip

	// Get the correct answer for display
	const getCorrectAnswer = (): { codingBlock: CodingBlock; codingBlockId: string } | null => {
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
			return correctChoice ? {
				codingBlock: currentQuestion.blockToFunctionFlashcard.codingBlock,
				codingBlockId: currentQuestion.blockToFunctionFlashcard.codingBlock.codingBlockId.toString()
			} : null
		}

		return null
	}

	const correctAnswer = getCorrectAnswer()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCheckClick = async (): Promise<void> => {
		if (isInConfirmationStage) {
			// For FILL_IN_BLANK: if incorrect, do not advance; let user try again
			if (currentQuestion?.questionType === "FILL_IN_BLANK" && !lastAnswerWasCorrect) {
				learnClass.retryCurrentQuestion()
				return
			}
			learnClass.continueToNextQuestion(lessonId)
		} else {
			// For demo questions, skip confirmation and go directly to next question
			if (currentQuestion?.questionType === "DEMO") {
				learnClass.continueToNextQuestion(lessonId)
				return
			}
			if (currentQuestion?.questionType !== "FILL_IN_BLANK") {
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
	}

	const shadowClass = useCallback((): string => {
		if (!isInConfirmationStage || lastAnswerWasCorrect) {
			return "shadow-chargingGreen-2"
		}
		return "shadow-cardinal"
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	const tactileButtonClass = useCallback((): string => {
		const baseClass = "h-11 px-12 py-4 text-xl font-semibold rounded-2xl text-standardBackground duration-0"
		if (!isInConfirmationStage || lastAnswerWasCorrect) {
			return `${baseClass} bg-chargingGreen`
		}
		return `${baseClass} bg-cardinal-1`
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	const footerBackgroundColor = useMemo((): string => {
		if (!isInConfirmationStage) return ""
		if (lastAnswerWasCorrect) return "bg-questionCorrectGreen !border-questionCorrectGreen"
		return "bg-questionIncorrectRed !border-questionIncorrectRed"
	}, [isInConfirmationStage, lastAnswerWasCorrect])

	return (
		<footer
			className={cn(
				"h-[20vh] border-t-2 border-swan flex items-center justify-between",
				"px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96",
				footerBackgroundColor
			)}
		>
			{/* Left: Send Code button for Fill-In-The-Blank */}
			<div className="h-12 w-48">
				{currentQuestion?.questionType === "FILL_IN_BLANK" && (
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
							<Check className="size-10 text-questionCorrectGreen-2" />
							<span className="text-3xl font-semibold text-questionCorrectGreen-2">Correct!</span>
						</>
					) : (
						<div className="flex items-center gap-3">
							<X className="size-10 text-cardinal" />
							<div className="flex flex-col items-center">
								{currentQuestion?.questionType === "FILL_IN_BLANK" && (
									<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
										{currentQuestion.fillInBlankFeedback || "Incorrect. Try again!"}
									</span>
								)}
								{currentQuestion?.questionType !== "FILL_IN_BLANK" && (
									<>
										<span className="text-3xl font-semibold text-questionIncorrectRed-2">Correct solution:</span>
										{correctAnswer && (
											<div className="relative h-24 w-32">
												<LearnMiniSandbox
													codingBlock={correctAnswer.codingBlock}
													className="w-full h-full"
												/>
											</div>
										)}
									</>
								)}
							</div>
						</div>
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
					(isSubmitting && currentQuestion?.questionType === "FILL_IN_BLANK") ||
					(!isInConfirmationStage &&
						!hasSelectedAnswer &&
						currentQuestion?.questionType !== "DEMO" &&
						currentQuestion?.questionType !== "FILL_IN_BLANK")
				}
			>
				{((): React.ReactNode => {
					if (isInConfirmationStage) {
						if (currentQuestion?.questionType === "FILL_IN_BLANK" && !lastAnswerWasCorrect) return "TRY AGAIN"
						return "CONTINUE"
					}
					if (currentQuestion?.questionType === "DEMO") return "CONTINUE"
					if (currentQuestion?.questionType === "FILL_IN_BLANK" && isSubmitting) {
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
