/* eslint-disable max-len */
import {
	BookOpen,
	Code,
	Play,
} from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import RightArrow from "./right-arrow"
import WelcomePageCard from "./welcome-page-card"

export default function InsideEachLesson() {
	return (
		<WelcomePageCard headerText="Inside Each Lesson">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				{/* Connection line behind the circles */}
				<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

				<div className="flex flex-col items-center mb-4 md:mb-0">
					<div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
						<BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
					</div>
					<span className="text-sm text-gray-600 dark:text-gray-300">
						Read
					</span>
				</div>

				<RightArrow />

				<div className="flex flex-col items-center mb-4 md:mb-0">
					<div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
						<Play className="w-10 h-10 text-purple-600 dark:text-purple-400" />
					</div>
					<span className="text-sm text-gray-600 dark:text-gray-300">
							Watch
					</span>
				</div>

				<RightArrow />

				<div className="flex flex-col items-center">
					<div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
						<Code className="w-10 h-10 text-green-600 dark:text-green-400" />
					</div>
					<span className="text-sm text-gray-600 dark:text-gray-300">
							Code
					</span>
				</div>
			</div>

			<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
					Start Learning
			</Button>
		</WelcomePageCard>
	)
}
