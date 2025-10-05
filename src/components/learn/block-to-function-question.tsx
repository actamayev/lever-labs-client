/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import BlockVisualization from "./block-visualization"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"

function BlockToFunctionQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	if (!currentQuestionState?.question.blockToFunctionFlashcard) {
		return null
	}

	const { codingBlock, blockToFunctionAnswerChoice } = currentQuestionState.question.blockToFunctionFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...blockToFunctionAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			{/* Question text */}
			<h2 className="text-3xl font-semibold text-questionText mb-8">
				What can I do with this block?
			</h2>

			{/* Question: Show the block */}
			<div className="flex justify-center mb-8">
				<div className="relative h-32 w-48">
					<BlockVisualization
						codingBlock={codingBlock}
						className="w-full h-full"
					/>
				</div>
			</div>

			{/* Answer choices: Function descriptions */}
			<div className="flex flex-col gap-3" style={{ transform: "translateY(2rem)" }}>
				{sortedChoices.map((choice): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.blockToFunctionAnswerChoiceId

					return (
						<TactileButton
							key={choice.blockToFunctionAnswerChoiceId}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									learnClass.setSelectedAnswer(choice.blockToFunctionAnswerChoiceId)
								}
							}}
							className={`h-12 w-full flex items-center justify-start px-4 text-lg font-semibold rounded-lg duration-0 ${
								isSelected
									? "bg-standardBackgroundHover border-2 border-macaw"
									: isInConfirmationStage
										? "bg-standardBackground border-2 border-swan cursor-default"
										: "bg-standardBackground border-2 border-swan hover:bg-polar"
							}`}
							shadowClass={isSelected ? "shadow-macaw" : "shadow-swan"}
							shadowHeight={2}
							disabled={isInConfirmationStage}
							shouldHoverPushButton={false}
						>
							<span className={"text-left text-eel"}>
								{choice.functionDescriptionText}
							</span>
						</TactileButton>
					)
				})}
			</div>
		</div>
	)
}

export default observer(BlockToFunctionQuestion)
