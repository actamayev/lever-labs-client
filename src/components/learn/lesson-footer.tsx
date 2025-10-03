"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { Check, X } from "lucide-react"
import { useCallback } from "react"
import BlockVisualization from "./block-visualization"
import { CodingBlock } from "@lever-labs/common-ts/types/learn"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, MeetPipTriggerType } from "@lever-labs/common-ts/protocol"

// eslint-disable-next-line max-lines-per-function, complexity
function LessonFooter({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null
	const currentQuestion = learnClass.currentQuestionState?.question

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

		// TODO: Add other question types as needed
		return null
	}

	const correctAnswer = getCorrectAnswer()

	const handleCheckClick = async (): Promise<void> => {
		if (isInConfirmationStage) {
			learnClass.continueToNextQuestion(lessonId)
		} else {
			// For demo questions, skip confirmation and go directly to next question
			if (currentQuestion?.questionType === "DEMO") {
				learnClass.continueToNextQuestion(lessonId)
				careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.S8_P3_EXIT)
			} else {
				await learnClass.checkCurrentAnswer(lessonId)
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
		const baseClass = "h-11 px-12 py-4 text-xl font-semibold rounded-2xl text-standardBackground"
		if (!isInConfirmationStage || lastAnswerWasCorrect) {
			return `${baseClass} bg-chargingGreen`
		}
		return `${baseClass} bg-cardinal-1`
	}, [lastAnswerWasCorrect, isInConfirmationStage])

	return (
		// eslint-disable-next-line max-len
		<footer className={`h-[20vh] border-t-2 border-swan flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96 ${
			!isInConfirmationStage ? "" : "bg-polar !border-polar"
		}`}>
			{/* Left: Empty space for balance */}
			<div className="h-12 w-48"></div>

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
							<div className="flex flex-col items-center">
								<span className="text-3xl font-semibold text-cardinal">Correct solution:</span>
								{correctAnswer && (
									<div className="relative h-24 w-32">
										<BlockVisualization
											codingBlock={correctAnswer.codingBlock}
											className="w-full h-full"
										/>
									</div>
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
					!isInConfirmationStage &&
					!hasSelectedAnswer &&
					currentQuestion?.questionType !== "DEMO" &&
					currentQuestion?.questionType !== "FILL_IN_BLANK"
				}
			>
				{(isInConfirmationStage || currentQuestion?.questionType === "DEMO") ? "CONTINUE" : "CHECK"}
			</TactileButton>
		</footer>
	)
}

export default observer(LessonFooter)
