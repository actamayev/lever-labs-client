import { CheckCircle, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../../shadcn/ui/button"
import { CustomQuiz } from "../../icons/custom-quiz"
import AnswerChoiceButton from "./answer-choice-button"
import QuizExplanationSection from "./quiz-explanation-section"

interface Props {
    blocks: ContentBlock[]
    onQuizComplete: (blockId: ContentBlockID, answers: QuizAnswerAttempt[]) => void
    activeQuiz: ActiveQuiz | null
    setActiveQuiz: React.Dispatch<React.SetStateAction<ActiveQuiz | null>>
}

// eslint-disable-next-line max-lines-per-function
export default function QuizSection(props: Props) {
	const {
		blocks,
		onQuizComplete,
		activeQuiz,
		setActiveQuiz
	} = props

	// Store answers for each question separately
	const [quizAnswers, setQuizAnswers] = useState<QuizAnswerAttempt[]>([])
	// Store selected answers for each question index
	const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
	const currentBlock = blocks.find(b => b.id === activeQuiz?.blockId)

	// Initialize answers from previous attempt if reviewing
	useEffect(() => {
		if (activeQuiz?.isReview) {
			setQuizAnswers(activeQuiz.previousAnswers)
			// Initialize selectedAnswers from previous answers
			const maxIndex = Math.max(...activeQuiz.previousAnswers.map(a => a.questionIndex))
			const initialSelected = Array(maxIndex + 1).fill(null)
			activeQuiz.previousAnswers.forEach(answer => {
				initialSelected[answer.questionIndex] = answer.selectedChoice
			})
			setSelectedAnswers(initialSelected)
		} else {
			setQuizAnswers([])
			setSelectedAnswers([])
		}
	}, [activeQuiz?.isReview, activeQuiz?.previousAnswers])

	const handleAnswerSelect = useCallback((choiceIndex: number) => {
		if (activeQuiz?.showExplanation) return

		setSelectedAnswers(prev => {
			const newAnswers = [...prev]
			newAnswers[activeQuiz?.questionIndex ?? 0] = choiceIndex
			return newAnswers
		})
	}, [activeQuiz?.showExplanation, activeQuiz?.questionIndex])

	const handleCheckAnswer = useCallback(() => {
		if (!currentBlock?.action.quiz?.questions[activeQuiz?.questionIndex ?? 0]) return

		const currentQuestionIndex = activeQuiz?.questionIndex ?? 0
		const selectedAnswer = selectedAnswers[currentQuestionIndex]
		if (selectedAnswer === null || selectedAnswer === undefined) return

		const isCorrect = currentBlock.action.quiz.questions[currentQuestionIndex].choices[selectedAnswer].correct

		setQuizAnswers(prev => {
			const newAnswers = [...prev]
			newAnswers[currentQuestionIndex] = {
				questionIndex: currentQuestionIndex,
				selectedChoice: selectedAnswer,
				isCorrect
			}
			return newAnswers
		})

		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				selectedChoice: selectedAnswer,
				showExplanation: true,
			}
		})
	}, [activeQuiz?.questionIndex, currentBlock?.action.quiz?.questions, selectedAnswers, setActiveQuiz])

	const handleNextQuestion = useCallback(() => {
		if (!activeQuiz || !currentBlock?.action.quiz) return

		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		if (isLastQuestion) {
			onQuizComplete(activeQuiz.blockId, quizAnswers)
			return
		}

		const nextQuestionIndex = activeQuiz.questionIndex + 1
		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				questionIndex: nextQuestionIndex,
				selectedChoice: selectedAnswers[nextQuestionIndex] ?? null,
				showExplanation: prev.isReview || false,
			}
		})
	}, [activeQuiz, currentBlock?.action.quiz, onQuizComplete, quizAnswers, selectedAnswers, setActiveQuiz])

	if (!activeQuiz || !currentBlock?.action.quiz) return null

	const currentQuestion = currentBlock.action.quiz.questions[activeQuiz.questionIndex]

	return (
		<div className="h-full flex flex-col">
			<div className="py-3 px-6 border-b-2 border-zinc-300 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-semibold flex flex-row items-center gap-4">
						{activeQuiz.isReview ? <CheckCircle /> : <CustomQuiz />}
						{activeQuiz.isReview ? "Quiz Review" : "Quiz"}
					</h3>
					<Button
						variant="ghost"
						size="icon"
						className="!p-5"
						onClick={() => setActiveQuiz(null)}
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-6">
				<h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

				<div className="grid grid-cols-2 gap-4">
					{[0, 1, 2, 3].map((index) => (
						<AnswerChoiceButton
							activeQuiz={activeQuiz}
							currentQuestion={currentQuestion}
							index={index}
							selectedAnswer={selectedAnswers[activeQuiz.questionIndex] ?? null}
							handleAnswerSelect={handleAnswerSelect}
							key={index}
						/>
					))}
				</div>
			</div>

			<div className="p-4">
				<QuizExplanationSection
					activeQuiz={activeQuiz}
					selectedAnswer={selectedAnswers[activeQuiz.questionIndex] ?? null}
					handleCheckAnswer={handleCheckAnswer}
					currentQuestion={currentQuestion}
					handleNextQuestion={handleNextQuestion}
					currentBlock={currentBlock}
				/>
			</div>
		</div>
	)
}
