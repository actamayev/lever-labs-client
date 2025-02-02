import { observer } from "mobx-react"
import { CheckCircle, X } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "../../shadcn/ui/button"
import { CustomQuiz } from "../../icons/custom-quiz"
import AnswerChoiceButton from "./answer-choice-button"
import QuizExplanationSection from "./quiz-explanation-section"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

function QuizSection() {
	const labReadingClass = useLabReadingContext()

	function QuizDropdownMenuItem({ question, blockId } : { question: Question, blockId: ContentBlockID }) {
		const setActiveQuizCallback = () => {
			labReadingClass.setActiveQuiz({
				blockId,
				questionUUID: question.questionUUID,
				isCorrect: null
			})
		}
		const disabled = labReadingClass.activeQuiz?.questionUUID === question.questionUUID
		return (
			<DropdownMenuItem
				className="cursor-pointer text-2xl"
				onClick={setActiveQuizCallback}
				disabled={disabled}
			>
				Quiz #
			</DropdownMenuItem>
		)
	}

	if (!labReadingClass.currentQuestion) return null

	return (
		<div className="h-full flex flex-col">
			<div className="py-3 px-6 border-b-2 border-zinc-300 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<h3
								className="text-2xl font-semibold flex flex-row items-center gap-4 cursor-pointer
								hover:bg-zinc-100 !px-2 py-1 rounded-lg"
							>
								{labReadingClass.activeQuiz?.isCorrect ? (
									<><CheckCircle />Quiz Review #</>
								) : (
									<><CustomQuiz /> Quiz #</>
								)}
							</h3>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="text-lg">
							{labReadingClass.activeBlocks.map((block) => {
								// Skip if there's no quiz action or no questions
								if (!block.action.quiz?.questions.length) return null

								return block.action.quiz.questions.map(question => (
									<QuizDropdownMenuItem
										key={`${block.id}-question-${question.questionUUID}`}
										question={question}
										blockId={block.id}
									/>
								))
							})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						variant="ghost"
						size="icon"
						className="!p-5"
						onClick={() => labReadingClass.setActiveQuiz(null)}
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-6">
				<h3 className="text-xl font-semibold mb-6">
					{labReadingClass.currentQuestion.question}
				</h3>

				<div className="grid grid-cols-2 gap-4">
					{[1, 2, 3, 4].map((index) => (
						<AnswerChoiceButton
							key={index}
							index={index as AnswerChoiceID}
						/>
					))}
				</div>
			</div>

			<QuizExplanationSection />
		</div>
	)
}


export default observer(QuizSection)
