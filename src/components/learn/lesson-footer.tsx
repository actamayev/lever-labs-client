"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { Check, X } from "lucide-react"
import { useCallback } from "react"
import BlockVisualization from "./block-visualization"

// eslint-disable-next-line max-lines-per-function
function LessonFooter({ lessonId }: { lessonId: LessonUUID}): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null
	const currentQuestion = learnClass.currentQuestionState?.question

	// Get the correct answer for display
	const getCorrectAnswer = (): string | null => {
		if (!currentQuestion) return null

		if (currentQuestion.questionType === "FUNCTION_TO_BLOCK" && currentQuestion.functionToBlockFlashcard) {
			const correctChoice = currentQuestion.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
				(choice): boolean => choice.isCorrect
			)
			return correctChoice ? correctChoice.codingBlock.codingBlockId.toString() : null
		}

		// TODO: Add other question types as needed
		return null
	}

	const correctAnswer = getCorrectAnswer()

	const handleCheckClick = async (): Promise<void> => {
		if (isInConfirmationStage) {
			learnClass.continueToNextQuestion(lessonId)
		} else {
			await learnClass.checkCurrentAnswer(lessonId)
		}
	}

	const handleRunCodeClick = (): void => {
		// TODO: Implement run code functionality
	}

	const shadowClass = useCallback((): string => {
		if (!isInConfirmationStage) {
			return "shadow-chargingGreen-2"
		}
		if (lastAnswerWasCorrect) {
			return "shadow-chargingGreen-3"
		}
		return "shadow-cardinal"
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	const tactileButtonClass = useCallback((): string => {
		const baseClass = "h-11 px-12 py-4 text-xl font-semibold rounded-2xl text-standardBackground"
		if (!isInConfirmationStage) {
			return `${baseClass} bg-chargingGreen`
		}
		if (lastAnswerWasCorrect) {
			return `${baseClass} bg-chargingGreen`
		}
		return `${baseClass} bg-cardinal-1`
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	return (
		// eslint-disable-next-line max-len
		<footer className={`h-[20vh] border-t-2 border-swan flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96 ${
			!isInConfirmationStage ? "" : "bg-polar !border-polar"
		}`}>
			{/* Left: Run code button */}
			<div className="h-12 w-48">
				<AnimatedStateButton
					buttonText="RUN CODE"
					onClick={handleRunCodeClick}
					className="duration-150 rounded-2xl text-lg h-11"
					isDisabled={!isInConfirmationStage && !hasSelectedAnswer}
				/>
			</div>

			{/* Center: Feedback message (only in confirmation stage) */}
			{isInConfirmationStage && (
				<div className="flex items-center gap-3">
					{lastAnswerWasCorrect ? (
						<>
							<Check className="size-10 text-chargingGreen" />
							<span className="text-3xl font-semibold text-chargingGreen">Correct!</span>
						</>
					) : (
						<div className="flex items-center gap-3">
							<X className="size-10 text-cardinal" />
							<div className="flex flex-col">
								<span className="text-3xl font-semibold text-cardinal">Correct solution:</span>
								<BlockVisualization
									codingBlock={correctAnswer}
									className="w-full h-full p-4"
								/>
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
				disabled={!isInConfirmationStage && !hasSelectedAnswer}
			>
				{isInConfirmationStage ? "CONTINUE" : "CHECK"}
			</TactileButton>
		</footer>
	)
}

export default observer(LessonFooter)
