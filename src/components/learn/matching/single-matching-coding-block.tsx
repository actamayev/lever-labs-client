"use client"

import { observer } from "mobx-react"
import { cn } from "../../../lib/utils"
import learnClass from "../../../classes/learn-class"
import LearnMiniSandbox from "../learn-mini-sandbox"

interface SingleMatchingCodingBlockProps {
	block: MatchingCodingBlock
	index: number
}

// eslint-disable-next-line complexity
function SingleMatchingCodingBlock({
	block,
	index
}: SingleMatchingCodingBlockProps): React.ReactNode {
	const questionId = learnClass.currentQuestionState?.question.questionId
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	if (!questionId) return null

	const { codingBlockId, codingBlockJson } = block
	const cardNumber = index + 1

	const matchingState = learnClass.getMatchingAnswerState(questionId)
	const isSelected = learnClass.isMatchingBlockSelected(questionId, codingBlockId)
	const isMatched = learnClass.isMatchingBlockMatched(questionId, codingBlockId)

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

	// Determine lip styles
	let lipClassName = "bg-swan text-hare"
	if (isMatched) {
		lipClassName = "bg-question-correct-green text-question-correct-green-2"
	} else if (hasIncorrectMatch) {
		lipClassName = "bg-question-incorrect-red text-white"
	} else if (isSelected) {
		lipClassName = "bg-macaw text-white"
	}

	return (
		<div
			className={cn(
				"relative w-full max-w-sm lg:w-96 duration-0 shrink-0 flex border-2 border-swan",
				isInConfirmationStage ? "cursor-default" : "cursor-pointer"
			)}
			onClick={(): void => learnClass.handleMatchingCodingBlockClick(questionId, codingBlockId)}
		>
			{/* Number lip on the left */}
			<div className={cn(
				"w-8 flex items-center justify-center text-lg font-bold shrink-0",
				lipClassName
			)}>
				{cardNumber}
			</div>
			<div className="h-14 flex-1 rounded-r-3xl overflow-hidden">
				<LearnMiniSandbox blocklyJson={codingBlockJson} />
			</div>
		</div>
	)
}

export default observer(SingleMatchingCodingBlock)

