
"use client"

import { observer } from "mobx-react"
import { useState, useEffect } from "react"
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

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	const [isSubmitting, setIsSubmitting] = useState(false)

	// Use the matching question keyboard handler hook
	useMatchingQuestionKeyboardHandler()

	// Get or initialize matching answer state from learn class
	const getMatchingState = (): {
		selectedCodingBlockId: number | null
		selectedMatchingAnswerId: number | null
		matchResults: Record<string, boolean>
		correctlyMatchedBlockIds: number[]
		correctlyMatchedChoiceIds: number[]
	} => {
		const question = currentQuestionState?.question
		if (!question?.matchingAnswerState) {
			return {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}
		return question.matchingAnswerState
	}

	// Handle matching submission when both sides are selected
	useEffect((): void => {
		if (!currentQuestionState) return

		const question = currentQuestionState.question
		const matchingState = question?.matchingAnswerState
		if (!matchingState) return

		const selectedCodingBlockId = matchingState.selectedCodingBlockId
		const selectedMatchingAnswerId = matchingState.selectedMatchingAnswerId

		if (
			selectedCodingBlockId !== null &&
			selectedMatchingAnswerId !== null &&
			!isSubmitting &&
			!isInConfirmationStage
		) {
			const handleMatch = async (): Promise<void> => {
				setIsSubmitting(true)

				const lesson = Array.from(learnClass.lessonsById.values()).find((l): boolean =>
					l.lessonQuestionMap?.some((q): boolean => q.question.questionId === question.questionId) ?? false
				)

				if (!lesson) {
					setIsSubmitting(false)
					return
				}

				await learnClass.submitMatchingPair(
					lesson.lessonId,
					question.questionId,
					selectedCodingBlockId,
					selectedMatchingAnswerId
				)

				setIsSubmitting(false)
			}

			void handleMatch()
		}
	}, [
		currentQuestionState?.question.matchingAnswerState?.selectedCodingBlockId,
		currentQuestionState?.question.matchingAnswerState?.selectedMatchingAnswerId,
		isSubmitting,
		isInConfirmationStage,
		currentQuestionState
	])


	if (!currentQuestionState?.question.matching) {
		return null
	}

	const matchingData = currentQuestionState.question.matching
	const { questionText, matchingAnswerChoice: matchingPairs } = matchingData

	// Transform pairs into separate arrays for display
	// Extract coding blocks (left side) - each pair has a codingBlock
	const codingBlocks = matchingPairs.map((pair): {
		codingBlockId: number
		codingBlockJson: BlocklyJson
		order: number
	} => ({
		codingBlockId: pair.codingBlock.codingBlockId,
		codingBlockJson: pair.codingBlock.codingBlockJson,
		order: pair.order
	}))

	// Extract matching answer choices (right side) - each pair has a matchingAnswerChoiceText
	const matchingAnswerChoice = matchingPairs.map((pair): {
		matchingAnswerChoiceTextId: number
		order: number
		text: string
	} => ({
		matchingAnswerChoiceTextId: pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId,
		order: pair.order,
		text: pair.matchingAnswerChoiceText.answerChoiceText
	}))

	// Sort by order
	const sortedCodingBlocks = [...codingBlocks].sort((a, b): number => a.order - b.order)
	const sortedMatchingChoices = [...matchingAnswerChoice].sort((a, b): number => a.order - b.order)

	const matchingState = getMatchingState()

	const getMatchResult = (codingBlockId: number, matchingAnswerId: number): boolean | undefined => {
		const matchKey = `${codingBlockId}-${matchingAnswerId}`
		return matchingState.matchResults[matchKey]
	}

	const isBlockMatched = (codingBlockId: number): boolean => {
		return matchingState.correctlyMatchedBlockIds.includes(codingBlockId)
	}

	const isChoiceMatched = (matchingAnswerId: number): boolean => {
		return matchingState.correctlyMatchedChoiceIds.includes(matchingAnswerId)
	}

	const isBlockSelected = (codingBlockId: number): boolean => {
		return matchingState.selectedCodingBlockId === codingBlockId
	}

	const isMatchingSelected = (matchingAnswerId: number): boolean => {
		return matchingState.selectedMatchingAnswerId === matchingAnswerId
	}

	const getBlockButtonClass = (codingBlockId: number): string => {
		const isSelected = isBlockSelected(codingBlockId)
		const isMatched = isBlockMatched(codingBlockId)
		const selectedAnswerId = matchingState.selectedMatchingAnswerId
		const hasResult = selectedAnswerId !== null && getMatchResult(codingBlockId, selectedAnswerId) !== undefined
		const result = selectedAnswerId !== null ? getMatchResult(codingBlockId, selectedAnswerId) : undefined

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
		return "bg-standard-background border-2 border-swan cursor-pointer"
	}

	const getMatchingButtonClass = (matchingAnswerId: number): string => {
		const isSelected = isMatchingSelected(matchingAnswerId)
		const isMatched = isChoiceMatched(matchingAnswerId)
		const selectedBlockId = matchingState.selectedCodingBlockId
		const hasResult = selectedBlockId !== null && getMatchResult(selectedBlockId, matchingAnswerId) !== undefined
		const result = selectedBlockId !== null ? getMatchResult(selectedBlockId, matchingAnswerId) : undefined

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
		const isSelected = isMatchingSelected(matchingAnswerId)
		const isMatched = isChoiceMatched(matchingAnswerId)
		const selectedBlockId = matchingState.selectedCodingBlockId
		const hasResult = selectedBlockId !== null && getMatchResult(selectedBlockId, matchingAnswerId) !== undefined
		const result = selectedBlockId !== null ? getMatchResult(selectedBlockId, matchingAnswerId) : undefined

		if (isMatched) {
			return "shadow-question-correct-green-1"
		}
		if (hasResult && result === true) {
			return "shadow-question-correct-green-1"
		}
		if (hasResult && result === false) {
			return "shadow-question-incorrect-red-1"
		}
		if (isSelected) {
			return "shadow-macaw"
		}
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
						const isSelected = isBlockSelected(block.codingBlockId)
						const cardNumber = index + 1

						return (
							<div
								key={block.codingBlockId}
								className={cn(
									"relative w-full max-w-sm lg:w-96 rounded-3xl duration-0 shrink-0",
									getBlockButtonClass(block.codingBlockId),
									isInConfirmationStage ? "cursor-default" : "cursor-pointer"
								)}
								onClick={(): void => {
									if (!isInConfirmationStage && !isBlockMatched(block.codingBlockId)) {
										const lesson = Array.from(learnClass.lessonsById.values())
											.find((l): boolean =>
												l.lessonQuestionMap?.some((q): boolean =>
													q.question.questionId === currentQuestionState.question.questionId
												) ?? false
											)
										if (lesson) {
											learnClass.setMatchingSelectedCodingBlock(
												lesson.lessonId,
												currentQuestionState.question.questionId,
												block.codingBlockId
											)
										}
									}
								}}
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
						const isSelected = isMatchingSelected(choice.matchingAnswerChoiceTextId)
						// Number right side 6-9, with last one being 0
						const choiceNumber = index === sortedMatchingChoices.length - 1 ? 0 : index + 6

						return (
							<TactileButton
								key={choice.matchingAnswerChoiceTextId}
								onClick={(): void => {
									if (!isInConfirmationStage && !isChoiceMatched(choice.matchingAnswerChoiceTextId)) {
										const lesson = Array.from(learnClass.lessonsById.values())
											.find((l): boolean =>
												l.lessonQuestionMap?.some((q): boolean =>
													q.question.questionId === currentQuestionState.question.questionId
												) ?? false
											)
										if (lesson) {
											learnClass.setMatchingSelectedAnswerChoice(
												lesson.lessonId,
												currentQuestionState.question.questionId,
												choice.matchingAnswerChoiceTextId
											)
										}
									}
								}}
								className={cn(
									"h-12 w-full lg:w-96 flex items-center justify-start px-4",
									"text-lg font-semibold rounded-lg duration-0 relative",
									getMatchingButtonClass(choice.matchingAnswerChoiceTextId),
									isInConfirmationStage ? "cursor-default" : "cursor-pointer"
								)}
								shadowClass={getMatchingShadowClass(choice.matchingAnswerChoiceTextId)}
								shadowHeight={2}
								disabled={isInConfirmationStage || isChoiceMatched(choice.matchingAnswerChoiceTextId)}
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

