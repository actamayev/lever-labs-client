"use client"

import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { Check } from "lucide-react"

function LessonFooter({ lessonId }: { lessonId: LessonUUID}): React.ReactNode {
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect
	const hasSelectedAnswer = learnClass.currentQuestionState?.selectedAnswerId !== null

	const handleCheckClick = async (): Promise<void> => {
		if (isInConfirmationStage) {
			learnClass.continueToNextQuestion(lessonId)
		} else {
			await learnClass.checkCurrentAnswer(lessonId)
		}
	}

	const handleRunCodeClick = (): void => {
		// TODO: Implement run code functionality
	}

	return (
		// eslint-disable-next-line max-len
		<footer className={`h-[20vh] border-t-2 border-swan flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96 ${
			!isInConfirmationStage ? "" : "bg-polar !border-polar"
		}`}>
			{/* Left: Run code button */}
			<div className="h-12 w-48">
				<AnimatedStateButton
					buttonText="RUN CODE"
					isDisabled={false}
					onClick={handleRunCodeClick}
					className="duration-150 rounded-2xl text-lg h-11"
				/>
			</div>

			{/* Center: Correct message (only in confirmation stage) */}
			{isInConfirmationStage && lastAnswerWasCorrect && (
				<div className="flex items-center gap-3">
					<Check className="w-6 h-6 text-green-600" />
					<span className="text-lg font-semibold text-green-600">Correct!</span>
				</div>
			)}

			{/* Right: Check/Continue button */}
			<TactileButton
				onClick={handleCheckClick}
				shadowClass="shadow-chargingGreen-2"
				className="h-11 px-12 py-4 text-xl font-semibold rounded-2xl text-standardBackground"
				shadowHeight={4}
				disabled={!isInConfirmationStage && !hasSelectedAnswer}
			>
				{isInConfirmationStage ? "CONTINUE" : "CHECK"}
			</TactileButton>
		</footer>
	)
}

export default observer(LessonFooter)
