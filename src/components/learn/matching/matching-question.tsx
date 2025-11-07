"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import learnClass from "../../../classes/learn-class"
import usePressEnterQuestionKeyboardHandler from "../../../hooks/learn/use-press-enter-question-keyboard-handler"
import useMatchingQuestionKeyboardHandler from "../../../hooks/learn/use-matching-question-keyboard-handler"
import useMatchingQuestionEscapeHandler from "../../../hooks/learn/use-matching-question-escape-handler"
import SingleMatchingCodingBlock from "./single-matching-coding-block"
import SingleMatchingTextChoice from "./single-matching-text-choice"
import shuffle from "../../../utils/learn/shuffle"

function MatchingQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	usePressEnterQuestionKeyboardHandler()
	useMatchingQuestionKeyboardHandler()
	useMatchingQuestionEscapeHandler()

	const matchingData = currentQuestionState?.question.matching
	const questionId = currentQuestionState?.question.questionId

	// Initialize shuffled arrays if they don't exist (randomize on first load)
	useEffect((): void => {
		if (!questionId || !matchingData?.matchingAnswerChoice) return

		const matchingState = learnClass.getMatchingAnswerState(questionId)

		// Only initialize if shuffled arrays don't exist
		if (!matchingState.shuffledCodingBlocks || !matchingState.shuffledMatchingChoices) {
			const matchingPairs = matchingData.matchingAnswerChoice

			// Extract coding blocks and shuffle
			const codingBlocks = matchingPairs.map((pair): MatchingCodingBlock => ({
				codingBlockId: pair.codingBlock.codingBlockId,
				codingBlockJson: pair.codingBlock.codingBlockJson,
			}))

			// Extract matching answer choices and shuffle
			const matchingAnswerChoices = matchingPairs.map((pair): MatchingTextChoice => ({
				matchingAnswerChoiceTextId: pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId,
				text: pair.matchingAnswerChoiceText.answerChoiceText
			}))

			// Store shuffled arrays in state (MobX will track these changes)
			matchingState.shuffledCodingBlocks = shuffle(codingBlocks)
			matchingState.shuffledMatchingChoices = shuffle(matchingAnswerChoices)
		}
	}, [questionId, matchingData?.matchingAnswerChoice])

	const matchingState = questionId ? learnClass.getMatchingAnswerState(questionId) : null
	const sortedCodingBlocks = matchingState?.shuffledCodingBlocks ?? []
	const sortedMatchingChoices = matchingState?.shuffledMatchingChoices ?? []

	if (!matchingData) return null

	const { questionText } = matchingData

	return (
		<div>
			<h2 className="text-3xl font-semibold text-question-text mb-8">
				{questionText}
			</h2>

			<div className="flex flex-col lg:flex-row gap-8 justify-center items-start" style={{ transform: "translateY(2rem)" }}>
				{/* Left side: Coding blocks */}
				<div className="flex flex-col gap-3 w-full lg:w-auto">
					{sortedCodingBlocks.map((block, index): React.ReactNode => (
						<SingleMatchingCodingBlock
							key={block.codingBlockId}
							block={block}
							index={index}
						/>
					))}
				</div>

				{/* Right side: Matching answer choices */}
				<div className="flex flex-col gap-3 w-full lg:w-auto">
					{sortedMatchingChoices.map((choice, index): React.ReactNode => {
						// Number right side 6-9, with last one being 0
						const choiceNumber = index === sortedMatchingChoices.length - 1 ? 0 : index + 6

						return (
							<SingleMatchingTextChoice
								key={choice.matchingAnswerChoiceTextId}
								choice={choice}
								choiceNumber={choiceNumber}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default observer(MatchingQuestion)
