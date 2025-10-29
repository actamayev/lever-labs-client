"use client"

import { Check } from "lucide-react"
import { useEffect } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { soundManager } from "../../classes/utility/sound-manager-class"
import ScoreAnalyticsCard from "./score-analytics-card"

export default function LessonCompletionScreen({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	useEffect((): void => {
		soundManager.playLevelPassed()
	}, [])

	return (
		<div className="flex-1 flex items-center justify-center">
			<div className="text-center space-y-8">
				<Check className="size-24 text-charging-green mx-auto" />
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
					Lesson complete!
				</h1>
				<ScoreAnalyticsCard lessonId={lessonId} />
			</div>
		</div>
	)
}
