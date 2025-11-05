"use client"

import { observer } from "mobx-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/utils"
import learnClass from "../../classes/learn-class"
import LearnMiniSandbox from "./learn-mini-sandbox"
import { TactileButton } from "../buttons/tactile-button"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import useMatchingQuestionKeyboardHandler from "../../hooks/learn/use-matching-question-keyboard-handler"

// eslint-disable-next-line max-lines-per-function
function MatchingQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	useQuestionKeyboardHandler()
	useMatchingQuestionKeyboardHandler()

	const questionId = currentQuestionState?.question.questionId
	if (!questionId) return null

	const matchingState = learnClass.getMatchingAnswerState(questionId)

	const matchingData = currentQuestionState?.question.matching
	if (!matchingData) return null

	const { questionText, matchingAnswerChoice: matchingPairs } = matchingData

	// Transform pairs into separate arrays for display
	// Extract coding blocks (left side) - each pair has a codingBlock
	const sortedCodingBlocks = matchingPairs.map((pair): {
		codingBlockId: number
		codingBlockJson: BlocklyJson
		order: number
	} => ({
		codingBlockId: pair.codingBlock.codingBlockId,
		codingBlockJson: pair.codingBlock.codingBlockJson,
		order: pair.order
	})).sort((a, b): number => a.order - b.order)

	// Extract matching answer choices (right side) - each pair has a matchingAnswerChoiceText
	const sortedMatchingChoices = matchingPairs.map((pair): {
		matchingAnswerChoiceTextId: number
		order: number
		text: string
	} => ({
		matchingAnswerChoiceTextId: pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId,
		order: pair.order,
		text: pair.matchingAnswerChoiceText.answerChoiceText
	})).sort((a, b): number => a.order - b.order)

	const getBlockButtonClass = (codingBlockId: number): string => {
		const isSelected = learnClass.isMatchingBlockSelected(questionId, codingBlockId)
		const isMatched = learnClass.isMatchingBlockMatched(questionId, codingBlockId)
		const selectedAnswerId = matchingState.selectedMatchingAnswerId
		const hasResult = selectedAnswerId !== null &&
			learnClass.getMatchingMatchResult(questionId, codingBlockId, selectedAnswerId) !== undefined
		const result = selectedAnswerId !== null
			? learnClass.getMatchingMatchResult(questionId, codingBlockId, selectedAnswerId)
			: undefined

		if (isMatched) {
			return "border-2 border-question-correct-green-1 cursor-default opacity-60"
		}
		if (hasResult && result === true) {
			return "border-2 border-question-correct-green-1 cursor-default"
		}
		if (hasResult && result === false) {
			return "bg-question-incorrect-red border-2 border-question-incorrect-red-1 cursor-default"
		}
		if (isSelected) {
			return "bg-standard-background-hover border-2 border-macaw"
		}
		return "bg-standard-background border-2 border-swan cursor-pointer"
	}

	const getMatchingButtonClass = (matchingAnswerId: number): string => {
		const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, matchingAnswerId)
		const isMatched = learnClass.isMatchingChoiceMatched(questionId, matchingAnswerId)
		const selectedBlockId = matchingState.selectedCodingBlockId
		const hasResult = selectedBlockId !== null &&
			learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId) !== undefined
		const result = selectedBlockId !== null
			? learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId)
			: undefined

		if (isMatched) {
			return "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default opacity-60"
		}
		if (hasResult && result === true) {
			return "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
		}
		if (hasResult && result === false) {
			return "bg-question-incorrect-red border-2 border-question-incorrect-red-1 cursor-default"
		}
		if (isSelected) {
			return "bg-standard-background-hover border-2 border-macaw"
		}
		return "bg-standard-background border-2 border-swan hover:bg-polar cursor-pointer"
	}

	const getMatchingShadowClass = (matchingAnswerId: number): string => {
		const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, matchingAnswerId)
		const isMatched = learnClass.isMatchingChoiceMatched(questionId, matchingAnswerId)
		const selectedBlockId = matchingState.selectedCodingBlockId
		const hasResult = selectedBlockId !== null &&
			learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId) !== undefined
		const result = selectedBlockId !== null
			? learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId)
			: undefined

		if (isMatched) return "shadow-question-correct-green-1"
		if (hasResult && result === true) return "shadow-question-correct-green-1"
		if (hasResult && result === false) return "shadow-question-incorrect-red-1"
		if (isSelected) return "shadow-macaw"
		return "shadow-swan"
	}

	return (
		<div>
			<h2 className="text-3xl font-semibold text-question-text mb-8">
				{questionText}
			</h2>

			<div className="flex flex-col lg:flex-row gap-8 justify-center items-start" style={{ transform: "translateY(2rem)" }}>
				{/* Left side: Coding blocks */}
				<div className="flex flex-col gap-4 w-full lg:w-auto">
					{sortedCodingBlocks.map((block, index): React.ReactNode => {
						const isSelected = learnClass.isMatchingBlockSelected(questionId, block.codingBlockId)
						const cardNumber = index + 1

						return (
							<div
								key={block.codingBlockId}
								className={cn(
									"relative w-full max-w-sm lg:w-96 rounded-3xl duration-0 shrink-0",
									getBlockButtonClass(block.codingBlockId),
									isInConfirmationStage ? "cursor-default" : "cursor-pointer"
								)}
								onClick={(): void => learnClass.handleMatchingCodingBlockClick(questionId, block.codingBlockId)}
							>
								<div className="h-48 rounded-t-3xl overflow-hidden">
									<LearnMiniSandbox
										blocklyJson={block.codingBlockJson}
										className=""
									/>
								</div>
								{/* Number lip below the sandbox */}
								<div className={cn(
									"h-8 rounded-b-3xl flex items-center justify-center text-lg font-bold",
									isSelected ? "bg-macaw text-white" : "bg-swan text-hare"
								)}>
									{cardNumber}
								</div>
							</div>
						)
					})}
				</div>

				{/* Right side: Matching answer choices */}
				<div className="flex flex-col gap-3 w-full lg:w-auto">
					{sortedMatchingChoices.map((choice, index): React.ReactNode => {
						const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, choice.matchingAnswerChoiceTextId)
						// Number right side 6-9, with last one being 0
						const choiceNumber = index === sortedMatchingChoices.length - 1 ? 0 : index + 6

						return (
							<TactileButton
								key={choice.matchingAnswerChoiceTextId}
								onClick={(): void => learnClass.handleMatchingChoiceClick(questionId, choice.matchingAnswerChoiceTextId)}
								className={cn(
									"h-12 w-full lg:w-96 flex items-center justify-start px-4",
									"text-lg font-semibold rounded-lg duration-0 relative",
									getMatchingButtonClass(choice.matchingAnswerChoiceTextId),
									isInConfirmationStage ? "cursor-default" : "cursor-pointer"
								)}
								shadowClass={getMatchingShadowClass(choice.matchingAnswerChoiceTextId)}
								shadowHeight={2}
								disabled={isInConfirmationStage ||
									learnClass.isMatchingChoiceMatched(questionId, choice.matchingAnswerChoiceTextId)}
								shouldHoverPushButton={false}
							>
								{/* Number badge on the left */}
								<div
									className={cn(
										"absolute left-2 w-8 h-8 rounded-lg border-2",
										"flex items-center justify-center text-sm font-bold",
										isSelected ? "border-macaw text-macaw" : "border-swan text-hare"
									)}
								>
									{choiceNumber}
								</div>
								<span className={cn("text-left text-eel ml-10", isSelected ? "text-macaw" : "text-eel")}>
									{choice.text}
								</span>
							</TactileButton>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default observer(MatchingQuestion)

