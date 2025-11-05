"use client"
import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
// import { TactileButton } from "../shadcn/ui/tactile-button"
import LearnMiniSandbox from "./learn-mini-sandbox"
import usePressEnterQuestionKeyboardHandler from "../../hooks/learn/use-press-enter-question-keyboard-handler"
import useFunctionToBlockKeyboardHandler from "../../hooks/learn/use-function-to-block-keyboard-handler"
import useFunctionToBlockEscapeHandler from "../../hooks/learn/use-function-to-block-escape-handler"
import { cn } from "../../lib/utils"

function FunctionToBlockQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	// Use the keyboard handler hooks
	usePressEnterQuestionKeyboardHandler()
	useFunctionToBlockKeyboardHandler()
	useFunctionToBlockEscapeHandler()

	if (!currentQuestionState?.question.functionToBlockFlashcard) return null

	const { questionText, functionToBlockAnswerChoice } = currentQuestionState.question.functionToBlockFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...functionToBlockAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			<h2 className="text-3xl font-semibold text-question-text">
				{questionText}
			</h2>

			<div
				className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 px-4 lg:px-0"
				style={{ transform: "translateY(5rem)" }}
			>
				{sortedChoices.map((choice, index): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.functionToBlockAnswerChoiceId
					const cardNumber = index + 1

					return (
						<div
							className={cn(
								"relative w-full max-w-sm lg:w-96 cursor-pointer rounded-3xl duration-0 shrink-0",
								isSelected ? "outline-2 outline-macaw" : "outline-2 outline-transparent hover:outline-macaw/50",
								isInConfirmationStage ? "cursor-default" : "cursor-pointer"
							)}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									learnClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)
								}
							}}
							key={choice.functionToBlockAnswerChoiceId}
						>
							<div className="h-48 rounded-t-3xl overflow-hidden">
								<LearnMiniSandbox
									blocklyJson={choice.codingBlock.codingBlockJson}
									className="w-full h-full rounded-t-3xl rounded-b-none"
								/>
							</div>
							{/* Number lip below the sandbox */}
							<div className={cn(
								"h-8 rounded-b-3xl flex items-center justify-center text-lg font-bold",
								isSelected ? "bg-macaw text-white" : "bg-swan text-hare"
							)}>
								{cardNumber}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default observer(FunctionToBlockQuestion)
