import { Bot } from "lucide-react"
import PathToMastery from "./path-to-mastery"
import { cn } from "../../../lib/shadcn/utils"
import InsideEachLesson from "./inside-each-lesson"
import AddPipWelcomeSection from "./add-pip-welcome-section"

export default function LabWelcome() {
	return (
		<div
			className="h-screen overflow-y-auto bg-gradient-to-b from-slate-50
			to-blue-50 dark:from-zinc-900 dark:to-pipTheme rounded-none"
		>
			<div className="p-6 space-y-12 h-full">
				<div className="text-center mb-12">
					<Bot className="w-16 h-16 text-emerald-600 dark:text-emerald-400 animate-bounce mx-auto" />
					<h1
						className={cn(
							"bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600",
							"dark:from-blue-400 dark:via-blue-400 dark:to-blue-400",
							"text-4xl font-bold bg-clip-text text-transparent"
						)}
					>
						Welcome to The Lab
					</h1>
				</div>
				<div className="flex flex-col gap-12">
					<AddPipWelcomeSection />
					<PathToMastery />
					<InsideEachLesson />
				</div>
			</div>
		</div>
	)
}
