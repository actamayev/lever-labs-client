/* eslint-disable max-len */
import {
	Bot,
} from "lucide-react"
import AddPipWelcomeSection from "./add-pip-welcome-section"
import PathToMastery from "./path-to-mastery"
import InsideEachLesson from "./inside-each-lesson"

// eslint-disable-next-line max-lines-per-function
export default function LabWelcome() {
	return (
		<div className="p-6 space-y-12 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-zinc-900 dark:to-purple-900 rounded-xl">
			<div className="text-center mb-12">
				<Bot className="w-16 h-16 text-purple-600 dark:text-purple-400 animate-bounce mx-auto" />
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
					Welcome to The Lab
				</h1>
			</div>
			<AddPipWelcomeSection />

			<PathToMastery />

			<InsideEachLesson />
		</div>
	)
}
