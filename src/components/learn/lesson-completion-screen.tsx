"use client"

import { Check } from "lucide-react"

export default function LessonCompletionScreen(): React.ReactNode {
	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="text-center">
				<Check className="size-24 text-charging-green mx-auto mb-6" />
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
					Lesson complete!
				</h1>
			</div>
		</div>
	)
}
