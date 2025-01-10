/* eslint-disable max-len */
import { Card, CardContent } from "@/components/shadcn/ui/card"
import { Button } from "@/components/shadcn/ui/button"
import {
	Bot,
	Wifi,
	Upload,
	Tag,
	BookOpen,
	Code,
	Play,
	ChevronRight
} from "lucide-react"

// eslint-disable-next-line max-lines-per-function
export default function LabWelcome() {
	return (
		<div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-zinc-900 dark:to-purple-900">
			{/* Hero - Minimal */}
			<div className="text-center mb-12">
				<Bot className="w-16 h-16 text-purple-600 dark:text-purple-400 animate-bounce mx-auto" />
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Welcome to The Lab
				</h1>
			</div>

			{/* New Pip Setup Section */}
			<Card className="bg-white dark:bg-zinc-800 border-2 border-purple-100 dark:border-purple-800">
				<CardContent className="pt-6">
					<div className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-6 flex justify-center">
            Have a Pip? Let&apos;s get started!
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
						{/* Connection line behind the circles */}
						<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

						{/* Step 1 */}
						<div className="flex flex-col items-center mb-4 md:mb-0">
							<div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
								<Tag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Name your Pip</span>
						</div>

						<div className="hidden md:flex items-center h-20">
							<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
						</div>

						{/* Step 2 */}
						<div className="flex flex-col items-center mb-4 md:mb-0">
							<div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
								<Wifi className="w-8 h-8 text-purple-600 dark:text-purple-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Connect to WiFi</span>
						</div>

						<div className="hidden md:flex items-center h-20">
							<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
						</div>

						{/* Step 3 */}
						<div className="flex flex-col items-center">
							<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
								<Upload className="w-8 h-8 text-green-600 dark:text-green-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Upload credentials</span>
						</div>
					</div>

					<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
            Add Your Pip
					</Button>
				</CardContent>
			</Card>

			{/* Lab Structure Section */}
			<Card className="bg-white dark:bg-zinc-800 border-2 border-purple-100 dark:border-purple-800">
				<CardContent className="pt-6">
					<div className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-6 flex justify-center">
            Ready to start learning?
					</div>

					{/* Lesson Structure */}
					<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
						{/* Connection line behind the circles */}
						<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

						<div className="flex flex-col items-center mb-4 md:mb-0">
							<div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
								<BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Read</span>
						</div>

						<div className="hidden md:flex items-center h-20">
							<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
						</div>

						<div className="flex flex-col items-center mb-4 md:mb-0">
							<div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
								<Play className="w-8 h-8 text-purple-600 dark:text-purple-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Watch</span>
						</div>

						<div className="hidden md:flex items-center h-20">
							<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
						</div>

						<div className="flex flex-col items-center">
							<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
								<Code className="w-8 h-8 text-green-600 dark:text-green-400" />
							</div>
							<span className="text-sm text-gray-600 dark:text-gray-300">Code</span>
						</div>
					</div>

					<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
            Start Learning
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
