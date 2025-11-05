"use client"

import { observer } from "mobx-react"
import { useState, useEffect } from "react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../buttons/tactile-button"
import LearnMiniSandbox from "./learn-mini-sandbox"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import { cn } from "../../lib/utils"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"

// eslint-disable-next-line max-lines-per-function
function MatchingQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	const [selectedCodingBlockId, setSelectedCodingBlockId] = useState<number | null>(null)
	const [selectedMatchingAnswerId, setSelectedMatchingAnswerId] = useState<number | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Get or initialize matching answer state from learn class
	const getMatchingState = (): {
		matchResults: Record<string, boolean>
		correctlyMatchedBlockIds: number[]
		correctlyMatchedChoiceIds: number[]
	} => {
		const question = currentQuestionState?.question
		if (!question?.matchingAnswerState) {
			return {
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}
		return question.matchingAnswerState
	}

	// Reset selections when question changes
	useEffect((): void => {
		setSelectedCodingBlockId(null)
		setSelectedMatchingAnswerId(null)
	}, [currentQuestionState?.question.questionId])

	// Handle matching submission when both sides are selected
	useEffect((): void => {
		if (
			selectedCodingBlockId !== null &&
			selectedMatchingAnswerId !== null &&
			!isSubmitting &&
			!isInConfirmationStage &&
			currentQuestionState
		) {
			const handleMatch = async (): Promise<void> => {
				setIsSubmitting(true)

				const lesson = Array.from(learnClass.lessonsById.values()).find((l): boolean =>
					l.lessonQuestionMap?.some((q): boolean => q.question.questionId === currentQuestionState.question.questionId) ?? false
				)

				if (!lesson) {
					setIsSubmitting(false)
					return
				}

				await learnClass.submitMatchingPair(
					lesson.lessonId,
					currentQuestionState.question.questionId,
					selectedCodingBlockId,
					selectedMatchingAnswerId
				)

				// Clear selections after submission (user can make another match)
				setSelectedCodingBlockId(null)
				setSelectedMatchingAnswerId(null)

				setIsSubmitting(false)
			}

			void handleMatch()
		}
	}, [selectedCodingBlockId, selectedMatchingAnswerId, isSubmitting, isInConfirmationStage, currentQuestionState])

	// Reset selections when exiting confirmation stage (after retry or continue)
	useEffect((): void => {
		if (!isInConfirmationStage) {
			setSelectedCodingBlockId(null)
			setSelectedMatchingAnswerId(null)
		}
	}, [isInConfirmationStage])

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
		return selectedCodingBlockId === codingBlockId
	}

	const isMatchingSelected = (matchingAnswerId: number): boolean => {
		return selectedMatchingAnswerId === matchingAnswerId
	}

	const getBlockButtonClass = (codingBlockId: number): string => {
		const isSelected = isBlockSelected(codingBlockId)
		const isMatched = isBlockMatched(codingBlockId)
		const hasResult = selectedMatchingAnswerId !== null && getMatchResult(codingBlockId, selectedMatchingAnswerId) !== undefined
		const result = selectedMatchingAnswerId !== null ? getMatchResult(codingBlockId, selectedMatchingAnswerId) : undefined

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

	const getMatchingButtonClass = (matchingAnswerId: number): string => {
		const isSelected = isMatchingSelected(matchingAnswerId)
		const isMatched = isChoiceMatched(matchingAnswerId)
		const hasResult = selectedCodingBlockId !== null && getMatchResult(selectedCodingBlockId, matchingAnswerId) !== undefined
		const result = selectedCodingBlockId !== null ? getMatchResult(selectedCodingBlockId, matchingAnswerId) : undefined

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
		const hasResult = selectedCodingBlockId !== null && getMatchResult(selectedCodingBlockId, matchingAnswerId) !== undefined
		const result = selectedCodingBlockId !== null ? getMatchResult(selectedCodingBlockId, matchingAnswerId) : undefined

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
									if (!isInConfirmationStage && !isSubmitting && !isBlockMatched(block.codingBlockId)) {
										setSelectedCodingBlockId(block.codingBlockId)
									}
								}}
							>
								<div className="h-48 rounded-t-3xl overflow-hidden">
									<LearnMiniSandbox
										blocklyJson={block.codingBlockJson}
										className="w-full h-full rounded-t-3xl rounded-b-none"
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
						const choiceNumber = index + 1

						return (
							<TactileButton
								key={choice.matchingAnswerChoiceTextId}
								onClick={(): void => {
									if (!isInConfirmationStage && !isSubmitting && !isChoiceMatched(choice.matchingAnswerChoiceTextId)) {
										setSelectedMatchingAnswerId(choice.matchingAnswerChoiceTextId)
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
								disabled={isInConfirmationStage || isSubmitting || isChoiceMatched(choice.matchingAnswerChoiceTextId)}
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

