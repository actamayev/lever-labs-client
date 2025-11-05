"use client"

import { observer } from "mobx-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import learnClass from "../../../classes/learn-class"
import usePressEnterQuestionKeyboardHandler from "../../../hooks/learn/use-press-enter-question-keyboard-handler"
import useMatchingQuestionKeyboardHandler from "../../../hooks/learn/use-matching-question-keyboard-handler"
import useMatchingQuestionEscapeHandler from "../../../hooks/learn/use-matching-question-escape-handler"
import SingleMatchingCodingBlock from "./single-matching-coding-block"
import SingleMatchingTextChoice from "./single-matching-text-choice"

function MatchingQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	usePressEnterQuestionKeyboardHandler()
	useMatchingQuestionKeyboardHandler()
	useMatchingQuestionEscapeHandler()

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
