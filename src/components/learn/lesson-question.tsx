/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import BlockVisualization from "./block-visualization"

function LessonQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	if (!currentQuestionState) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					Loading question...
				</p>
			</div>
		)
	}

	const { question, selectedAnswerId } = currentQuestionState

	if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
		const { questionText, functionToBlockAnswerChoice } = question.functionToBlockFlashcard

		// Sort answer choices by order
		const sortedChoices = [...functionToBlockAnswerChoice].sort((a, b): number => a.order - b.order)

		return (
			<div>
				<h2 className="text-3xl font-semibold text-questionText">
					{questionText}
				</h2>

				<div className="flex justify-start gap-4" style={{ transform: "translateY(5rem)" }}>
					{sortedChoices.map((choice): React.ReactNode => {
						const isSelected = selectedAnswerId === choice.functionToBlockAnswerChoiceId

						return (
							<TactileButton
								key={choice.functionToBlockAnswerChoiceId}
								onClick={(): void => {
									if (!isInConfirmationStage) {
										learnClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)
									}
								}}
								className={`h-64 w-48 flex items-center justify-center text-lg font-semibold rounded-lg duration-0 ${
									isSelected
										? "bg-standardBackgroundHover border-2 border-selectedSidebarButtonBorder"
										: isInConfirmationStage
											? "bg-standardBackground border-2 border-swan cursor-default"
											: "bg-standardBackground border-2 border-swan hover:bg-standardBackgroundHover"
								}`}
								shadowClass="shadow-gray-2"
								shadowHeight={2}
								disabled={isInConfirmationStage}
							>
								<BlockVisualization
									codingBlock={choice.codingBlock}
									className="w-full h-full p-4"
								/>
							</TactileButton>
						)
					})}
				</div>
			</div>
		)
	}

	if (question.questionType === "BLOCK_TO_FUNCTION" && question.blockToFunctionFlashcard) {
		// TODO: Implement BLOCK_TO_FUNCTION UI
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					BLOCK_TO_FUNCTION question type not yet implemented
				</p>
			</div>
		)
	}

	if (question.questionType === "FILL_IN_BLANK" && question.fillInTheBlank) {
		// TODO: Implement FILL_IN_BLANK UI
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					FILL_IN_BLANK question type not yet implemented
				</p>
			</div>
		)
	}

	return (
		<div className="text-center">
			<p className="text-gray-500 dark:text-gray-400">
				Unknown question type
			</p>
		</div>
	)
}

export default observer(LessonQuestion)
