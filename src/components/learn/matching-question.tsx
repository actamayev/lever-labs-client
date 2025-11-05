"use client"

import { observer } from "mobx-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/utils"
import learnClass from "../../classes/learn-class"
import LearnMiniSandbox from "./learn-mini-sandbox"
import { TactileButton } from "../buttons/tactile-button"
import usePressEnterQuestionKeyboardHandler from "../../hooks/learn/use-press-enter-question-keyboard-handler"
import useMatchingQuestionKeyboardHandler from "../../hooks/learn/use-matching-question-keyboard-handler"
import useMatchingQuestionEscapeHandler from "../../hooks/learn/use-matching-question-escape-handler"

// eslint-disable-next-line max-lines-per-function
function MatchingQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	usePressEnterQuestionKeyboardHandler()
	useMatchingQuestionKeyboardHandler()
	useMatchingQuestionEscapeHandler()

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


	const getBlockLipClass = (codingBlockId: number): string => {
		const isSelected = learnClass.isMatchingBlockSelected(questionId, codingBlockId)
		const isMatched = learnClass.isMatchingBlockMatched(questionId, codingBlockId)

		if (isMatched) {
			return "bg-question-correct-green text-question-correct-green-2"
		}

		// Check all match results for this coding block to see if it has any incorrect matches
		const matchResults = matchingState.matchResults
		let hasIncorrectMatch = false

		for (const [matchKey, result] of Object.entries(matchResults)) {
			const [blockIdStr] = matchKey.split("-")
			if (parseInt(blockIdStr, 10) === codingBlockId) {
				if (result === false) {
					hasIncorrectMatch = true
					break
				}
			}
		}

		// Check if there's a result with the currently selected answer choice
		const selectedAnswerId = matchingState.selectedMatchingAnswerId
		if (selectedAnswerId !== null) {
			const currentResult = learnClass.getMatchingMatchResult(questionId, codingBlockId, selectedAnswerId)
			if (currentResult === false) {
				hasIncorrectMatch = true
			}
		}

		if (hasIncorrectMatch) {
			return "bg-question-incorrect-red text-white"
		}
		if (isSelected) {
			return "bg-macaw text-white"
		}
		return "bg-swan text-hare"
	}

	// eslint-disable-next-line complexity
	const getMatchingButtonClass = (matchingAnswerId: number): string => {
		const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, matchingAnswerId)
		const isMatched = learnClass.isMatchingChoiceMatched(questionId, matchingAnswerId)

		if (isMatched) {
			return "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
		}

		// Check all match results for this matching choice to see if it has any incorrect matches
		const matchResults = matchingState.matchResults
		let hasIncorrectMatch = false
		let hasCorrectMatch = false

		for (const [matchKey, result] of Object.entries(matchResults)) {
			const [, choiceIdStr] = matchKey.split("-")
			if (parseInt(choiceIdStr, 10) === matchingAnswerId) {
				if (result === false) {
					hasIncorrectMatch = true
				} else if (result === true) {
					hasCorrectMatch = true
				}
			}
		}

		// Check if there's a result with the currently selected coding block
		const selectedBlockId = matchingState.selectedCodingBlockId
		if (selectedBlockId !== null) {
			const currentResult = learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId)
			if (currentResult === false) {
				hasIncorrectMatch = true
			} else if (currentResult === true) {
				hasCorrectMatch = true
			}
		}

		if (hasIncorrectMatch) {
			return "bg-question-incorrect-red border-2 border-question-incorrect-red-1 cursor-default"
		}
		if (hasCorrectMatch) {
			return "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
		}
		if (isSelected) {
			return "bg-standard-background-hover border-2 border-macaw"
		}
		return "bg-standard-background border-2 border-swan hover:bg-polar cursor-pointer"
	}

	// eslint-disable-next-line complexity
	const getMatchingShadowClass = (matchingAnswerId: number): string => {
		const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, matchingAnswerId)
		const isMatched = learnClass.isMatchingChoiceMatched(questionId, matchingAnswerId)

		if (isMatched) return "shadow-question-correct-green-1"

		// Check all match results for this matching choice to see if it has any incorrect matches
		const matchResults = matchingState.matchResults
		let hasIncorrectMatch = false
		let hasCorrectMatch = false

		for (const [matchKey, result] of Object.entries(matchResults)) {
			const [, choiceIdStr] = matchKey.split("-")
			if (parseInt(choiceIdStr, 10) === matchingAnswerId) {
				if (result === false) {
					hasIncorrectMatch = true
				} else if (result === true) {
					hasCorrectMatch = true
				}
			}
		}

		// Check if there's a result with the currently selected coding block
		const selectedBlockId = matchingState.selectedCodingBlockId
		if (selectedBlockId !== null) {
			const currentResult = learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerId)
			if (currentResult === false) {
				hasIncorrectMatch = true
			} else if (currentResult === true) {
				hasCorrectMatch = true
			}
		}

		if (hasIncorrectMatch) return "shadow-question-incorrect-red-1"
		if (hasCorrectMatch) return "shadow-question-correct-green-1"
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
						const cardNumber = index + 1

						return (
							<div
								key={block.codingBlockId}
								className={cn(
									"relative w-full max-w-sm lg:w-96 duration-0 shrink-0 flex  border-2 border-swan",
									isInConfirmationStage ? "cursor-default" : "cursor-pointer"
								)}
								onClick={(): void => learnClass.handleMatchingCodingBlockClick(questionId, block.codingBlockId)}
							>
								{/* Number lip on the left */}
								<div className={cn(
									"w-8 flex items-center justify-center text-lg font-bold shrink-0",
									getBlockLipClass(block.codingBlockId)
								)}>
									{cardNumber}
								</div>
								<div className="h-14 flex-1 rounded-r-3xl overflow-hidden">
									<LearnMiniSandbox blocklyJson={block.codingBlockJson} />
								</div>
							</div>
						)
					})}
				</div>

				{/* Right side: Matching answer choices */}
				<div className="flex flex-col gap-3 w-full lg:w-auto">
					{sortedMatchingChoices.map((choice, index): React.ReactNode => {
						const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, choice.matchingAnswerChoiceTextId)
						const isMatched = learnClass.isMatchingChoiceMatched(questionId, choice.matchingAnswerChoiceTextId)
						// Number right side 6-9, with last one being 0
						const choiceNumber = index === sortedMatchingChoices.length - 1 ? 0 : index + 6

						// Determine badge styles
						let badgeClassName = "border-swan text-hare"
						if (isMatched) {
							badgeClassName = "border-question-correct-green-1 text-question-correct-green-2"
						} else if (isSelected) {
							badgeClassName = "border-macaw text-macaw"
						}

						// Determine text styles
						let textClassName = "text-eel"
						if (isMatched) {
							textClassName = "text-question-correct-green-2"
						} else if (isSelected) {
							textClassName = "text-macaw"
						}

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
										badgeClassName
									)}
								>
									{choiceNumber}
								</div>
								<span className={cn("text-left ml-10", textClassName)}>
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

