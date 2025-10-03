"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import learnClass from "../../classes/learn-class"

function LessonQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState

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
			<div className="space-y-6">
				{/* Question text */}
				<div className="text-center">
					<h2 className="text-xl font-semibold text-questionText">
						{questionText}
					</h2>
				</div>

				{/* Answer choices */}
				<div className="flex justify-center gap-4">
					{sortedChoices.map((choice): React.ReactNode => {
						const isSelected = selectedAnswerId === choice.functionToBlockAnswerChoiceId

						return (
							<TactileButton
								key={choice.functionToBlockAnswerChoiceId}
								onClick={(): void => learnClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)}
								className={`h-16 w-12 flex items-center justify-center text-lg font-semibold rounded-lg transition-colors ${
									isSelected
										? "bg-standardBackgroundHover border-2 border-selectedSidebarButtonBorder"
										: "bg-standardBackground border-2 border-swan hover:bg-standardBackgroundHover"
								}`}
								shadowClass="shadow-gray-2"
								shadowHeight={4}
							>
								{choice.codingBlockId}
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
