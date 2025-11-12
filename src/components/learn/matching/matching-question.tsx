"use client"

import { observer } from "mobx-react"
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
	const questionId = currentQuestionState?.question.questionId

	const matchingState = questionId ? learnClass.getMatchingAnswerState(questionId) : null
	const sortedCodingBlocks = matchingState?.shuffledCodingBlocks ?? []
	const sortedMatchingChoices = matchingState?.shuffledMatchingChoices ?? []

	if (!matchingData) return null

	const { questionText } = matchingData

	return (
		<div className="flex flex-col">
			<h2 className="text-3xl font-semibold text-question-text mb-8 text-center">
				{questionText}
			</h2>

			<div className="flex flex-col lg:flex-row gap-8 justify-center items-center" style={{ transform: "translateY(2rem)" }}>
				{/* Left side: Coding blocks */}
				<div className="flex flex-col gap-3 w-full lg:w-auto">
					{sortedCodingBlocks.map((codingBlock, index): React.ReactNode => (
						<SingleMatchingCodingBlock
							key={codingBlock.codingBlockId}
							codingBlock={codingBlock}
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
