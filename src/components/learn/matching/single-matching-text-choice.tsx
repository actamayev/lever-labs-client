"use client"

import { observer } from "mobx-react"
import { cn } from "../../../lib/utils"
import learnClass from "../../../classes/learn-class"
import { TactileButton } from "../../buttons/tactile-button"

interface SingleMatchingTextChoiceProps {
	choice: MatchingTextChoice
	choiceNumber: number
}

// eslint-disable-next-line max-lines-per-function, complexity
function SingleMatchingTextChoice(props: SingleMatchingTextChoiceProps): React.ReactNode {
	const { choice, choiceNumber } = props
	const questionId = learnClass.currentQuestionState?.question.questionId
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	if (!questionId) return null

	const { matchingAnswerChoiceTextId, text } = choice

	const matchingState = learnClass.getMatchingAnswerState(questionId)
	const isSelected = learnClass.isMatchingAnswerChoiceSelected(questionId, matchingAnswerChoiceTextId)
	const isMatched = learnClass.isMatchingChoiceMatched(questionId, matchingAnswerChoiceTextId)

	// Check all match results for this matching choice to see if it has any incorrect matches
	const matchResults = matchingState.matchResults
	let hasIncorrectMatch = false
	let hasCorrectMatch = false

	for (const [matchKey, result] of Object.entries(matchResults)) {
		const [, choiceIdStr] = matchKey.split("-")
		if (parseInt(choiceIdStr, 10) === matchingAnswerChoiceTextId) {
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
		const currentResult = learnClass.getMatchingMatchResult(questionId, selectedBlockId, matchingAnswerChoiceTextId)
		if (currentResult === false) {
			hasIncorrectMatch = true
		} else if (currentResult === true) {
			hasCorrectMatch = true
		}
	}

	// Determine button class
	let buttonClassName = "bg-standard-background border-2 border-swan hover:bg-polar cursor-pointer"
	if (isMatched) {
		buttonClassName = "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
	} else if (hasIncorrectMatch) {
		buttonClassName = "bg-question-incorrect-red border-2 border-question-incorrect-red-2 cursor-default"
	} else if (hasCorrectMatch) {
		buttonClassName = "bg-question-correct-green border-2 border-question-correct-green-1 cursor-default"
	} else if (isSelected) {
		buttonClassName = "bg-standard-background-hover border-2 border-macaw"
	}

	// Determine shadow class
	let shadowClassName = "shadow-swan"
	if (isMatched) {
		shadowClassName = "shadow-question-correct-green-1"
	} else if (hasIncorrectMatch) {
		shadowClassName = "shadow-question-incorrect-red-1"
	} else if (hasCorrectMatch) {
		shadowClassName = "shadow-question-correct-green-1"
	} else if (isSelected) {
		shadowClassName = "shadow-macaw"
	}

	// Determine badge styles
	let badgeClassName = "border-swan text-hare"
	if (isMatched) {
		badgeClassName = "border-question-correct-green-1 text-question-correct-green-2"
	} else if (hasIncorrectMatch) {
		badgeClassName = "border-question-incorrect-red-2 text-question-incorrect-red-2"
	} else if (hasCorrectMatch) {
		badgeClassName = "border-question-correct-green-1 text-question-correct-green-2"
	} else if (isSelected) {
		badgeClassName = "border-macaw text-macaw"
	}

	// Determine text styles
	let textClassName = "text-eel"
	if (isMatched) {
		textClassName = "text-question-correct-green-2"
	} else if (hasIncorrectMatch) {
		textClassName = "text-question-incorrect-red-2"
	} else if (hasCorrectMatch) {
		textClassName = "text-question-correct-green-2"
	} else if (isSelected) {
		textClassName = "text-macaw"
	}

	return (
		<TactileButton
			onClick={(): void => learnClass.handleMatchingChoiceClick(questionId, matchingAnswerChoiceTextId)}
			className={cn(
				"h-12 w-full lg:w-96 flex items-center justify-start px-4",
				"text-lg font-semibold rounded-lg duration-0 relative",
				buttonClassName,
				isInConfirmationStage ? "cursor-default" : "cursor-pointer"
			)}
			shadowClass={shadowClassName}
			shadowHeight={2}
			disabled={isInConfirmationStage || isMatched}
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
				{text}
			</span>
		</TactileButton>
	)
}

export default observer(SingleMatchingTextChoice)
