"use client"

import * as React from "react"
import { observer } from "mobx-react"
import { cn } from "../../../lib/utils"
import questClass from "../../../classes/quest-class"
import QuestMiniSandbox from "../quest-mini-sandbox"
import { CodingBlock } from "@actamayev/lever-labs-common-ts/types/quest"

interface SingleMatchingCodingBlockProps {
	codingBlock: CodingBlock
	index: number
}

// eslint-disable-next-line complexity
function SingleMatchingCodingBlock(props: SingleMatchingCodingBlockProps): React.ReactNode {
	const { codingBlock, index } = props
	const questionId = questClass.currentQuestionState?.question.questionId
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	if (!questionId) return null

	const { codingBlockId } = codingBlock
	const cardNumber = index + 1

	const matchingState = questClass.getMatchingAnswerState(questionId)
	const isSelected = questClass.isMatchingBlockSelected(questionId, codingBlockId)
	const isMatched = questClass.isMatchingBlockMatched(questionId, codingBlockId)

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
		const currentResult = questClass.getMatchingMatchResult(questionId, codingBlockId, selectedAnswerId)
		if (currentResult === false) {
			hasIncorrectMatch = true
		}
	}

	// Determine badge styles (matching text choice pattern)
	let badgeClassName = "border-swan text-hare"
	if (isMatched) {
		badgeClassName = "border-question-correct-green-1 text-question-correct-green-2"
	} else if (hasIncorrectMatch) {
		badgeClassName = "border-question-incorrect-red-2 text-question-incorrect-red-2"
	} else if (isSelected) {
		badgeClassName = "border-macaw text-macaw"
	}

	// Determine container styles (matching text choice pattern)
	let containerClassName = "bg-standard-background border-2 border-swan hover:bg-polar cursor-pointer"
	if (isMatched) {
		containerClassName = "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
	} else if (hasIncorrectMatch) {
		containerClassName = "bg-question-incorrect-red border-2 border-question-incorrect-red-2 cursor-default"
	} else if (isSelected) {
		containerClassName = "bg-standard-background-hover border-2 border-macaw"
	}

	// Determine shadow class (matching text choice pattern)
	let shadowClassName = "shadow-swan"
	if (isMatched) {
		shadowClassName = "shadow-question-correct-green-1"
	} else if (hasIncorrectMatch) {
		shadowClassName = "shadow-question-incorrect-red-2"
	} else if (isSelected) {
		shadowClassName = "shadow-macaw"
	}

	// Extract color variable from shadow class (e.g., "shadow-swan" -> "swan")
	const colorVar = shadowClassName.replace("shadow-", "")
	const isDisabled = isInConfirmationStage || isMatched

	return (
		<div
			className={cn(
				"relative w-full max-w-sm lg:max-w-none lg:w-[350px] duration-0 shrink-0 flex items-center rounded-lg h-12 px-4",
				containerClassName,
				// Tactile shadow effect (2px shadow)
				!isDisabled && "shadow-[0_2px_0_0_var(--shadow-color)]",
				// Active effect (compress on click)
				!isDisabled && "active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0.5",
				isDisabled ? "cursor-default" : "cursor-pointer",
				isMatched && "opacity-50"
			)}
			style={{
				"--shadow-color": `rgb(var(--${colorVar}))`,
			} as React.CSSProperties}
			onClick={(): void => {
				if (isDisabled) return
				questClass.handleMatchingCodingBlockClick(questionId, codingBlockId)
			}}
		>
			{/* Number badge on the left */}
			<div
				className={cn(
					"absolute left-2 w-8 h-8 rounded-lg border-2",
					"flex items-center justify-center text-sm font-bold",
					badgeClassName
				)}
			>
				{cardNumber}
			</div>
			<div className="h-10 flex-1 ml-10 rounded-lg overflow-hidden">
				<QuestMiniSandbox codingBlock={codingBlock} />
			</div>
		</div>
	)
}

export default observer(SingleMatchingCodingBlock)
