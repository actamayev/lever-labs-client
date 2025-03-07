import { observer } from "mobx-react"
import { CheckCircle, X } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Button } from "../../shadcn/ui/button"
import { CustomQuiz } from "../../icons/custom-quiz"
import AnswerChoiceButton from "./answer-choice-button"
import QuizListDropdownItem from "./quiz-list-dropdown-item"
import QuizExplanationSection from "./quiz-explanation-section"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

function QuizSection() {
	const labReadingClass = useLabReadingContext()

	if (!labReadingClass.currentQuestion || !labReadingClass.activeQuiz) return null

	return (
		<div className="h-full flex flex-col">
			<div className="py-3 px-6 shadow-md">
				<div className="flex items-center justify-between">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<h3
								className="text-2xl font-semibold flex flex-row items-center gap-4 cursor-pointer
								hover:bg-sidebarButtonHoverLight !px-2 py-1 rounded-lg dark:hover:bg-sidebarButtonHoverDark"
							>
								{labReadingClass.activeQuiz.isCorrect ? (
									<><CheckCircle />Quiz Review #{
										labReadingClass.getQuestionIndexInAllBlocks(labReadingClass.currentQuestion.questionUUID) + 1
									}</>
								) : (
									<><CustomQuiz /> Quiz #{
										labReadingClass.getQuestionIndexInAllBlocks(labReadingClass.currentQuestion.questionUUID) + 1
									}</>
								)}
							</h3>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className="text-lg overflow-y-auto"
							style={{ "maxHeight": "500px"}}
						>
							{labReadingClass.activeBlocks.map((block) => {
								if (!block.action.quiz?.questions.length) return null

								return block.action.quiz.questions.map(question => (
									<div
										key={`${block.id}-question-${question.questionUUID}`}
										className="py-0.5"
									>
										<QuizListDropdownItem
											question={question}
											blockId={block.id}
										/>
									</div>
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

			<div className="p-4">
				<QuizExplanationSection />
			</div>
		</div>
	)
}


export default observer(QuizSection)
