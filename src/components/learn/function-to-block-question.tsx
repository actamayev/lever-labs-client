/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import BlockVisualization from "./block-visualization"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"

function FunctionToBlockQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	if (!currentQuestionState?.question.functionToBlockFlashcard) {
		return null
	}

	const { questionText, functionToBlockAnswerChoice } = currentQuestionState.question.functionToBlockFlashcard
	const { selectedAnswerId } = currentQuestionState

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
									? "bg-standardBackgroundHover border-2 border-macaw"
									: isInConfirmationStage
										? "bg-standardBackground border-2 border-swan cursor-default"
										: "bg-standardBackground border-2 border-swan hover:bg-polar"
							}`}
							shadowClass={isSelected ? "shadow-macaw" : "shadow-swan"}
							shadowHeight={2}
							shouldHoverPushButton={false}
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

export default observer(FunctionToBlockQuestion)
