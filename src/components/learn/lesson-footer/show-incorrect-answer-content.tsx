/* eslint-disable complexity */
"use client"

import { observer } from "mobx-react"
import learnClass from "../../../classes/learn-class"
import { X } from "lucide-react"
import LearnMiniSandbox from "../learn-mini-sandbox"
import { CodingBlock } from "@lever-labs/common-ts/types/learn"

// eslint-disable-next-line max-lines-per-function
function ShowIncorrectAnswerContent(): React.ReactNode {
	const currentQuestion = learnClass.currentQuestionState?.question
	// Get the correct answer for display using the server-provided correct answer choice ID
	const getCorrectAnswer = (): { codingBlock: CodingBlock; codingBlockId: string } | string | null => {
		if (!currentQuestion || !currentQuestion.correctAnswerChoiceId) return null

		const correctAnswerChoiceId = currentQuestion.correctAnswerChoiceId

		if (currentQuestion.questionType === "FUNCTION_TO_BLOCK" && currentQuestion.functionToBlockFlashcard) {
			const correctChoice = currentQuestion.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
				(choice): boolean => choice.functionToBlockAnswerChoiceId === correctAnswerChoiceId
			)
			return correctChoice ? {
				codingBlock: correctChoice.codingBlock,
				codingBlockId: correctChoice.codingBlock.codingBlockId.toString()
			} : null
		}

		if (currentQuestion.questionType === "BLOCK_TO_FUNCTION" && currentQuestion.blockToFunctionFlashcard) {
			const correctChoice = currentQuestion.blockToFunctionFlashcard.blockToFunctionAnswerChoice.find(
				(choice): boolean => choice.blockToFunctionAnswerChoiceId === correctAnswerChoiceId
			)
			return correctChoice ? correctChoice.functionDescriptionText : null
		}

		if (currentQuestion.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && currentQuestion.actionToCodeMultipleChoice) {
			const correctChoice = currentQuestion.actionToCodeMultipleChoice.actionToCodeMultipleChoiceAnswerChoice.find(
				(choice): boolean => choice.actionToCodeMultipleChoiceAnswerChoiceId === correctAnswerChoiceId
			)
			return correctChoice ? {
				codingBlock: correctChoice.codingBlock,
				codingBlockId: correctChoice.codingBlock.codingBlockId.toString()
			} : null
		}

		return null
	}

	const correctAnswer = getCorrectAnswer()

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
				{!correctAnswer && (
					<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
						Incorrect. Try again!
					</span>
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
					{!correctAnswer && (
						<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
							Incorrect. Try again!
						</span>
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
				{!correctAnswer && (
					<span className="text-xl font-medium text-cardinal text-center max-w-[48ch]">
						Incorrect. Try again!
					</span>
				)}
			</div>
		)
	}
	return null
}

export default observer(ShowIncorrectAnswerContent)
