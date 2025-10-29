"use client"

import { Target } from "lucide-react"
import { useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import { cn } from "../../lib/utils"
import { observer } from "mobx-react"

// eslint-disable-next-line max-lines-per-function
function ScoreAnalyticsCard({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const { score, totalQuestions } = useMemo((): { score: number; totalQuestions: number } => {
		const lesson = learnClass.getLesson(lessonId)
		if (!lesson?.lessonQuestionMap) {
			return { score: 0, totalQuestions: 0 }
		}

		return {
			score: lesson.numberQuestionsCorrectFirstTry,
			totalQuestions: lesson.lessonQuestionMap.length
		}
	}, [lessonId])

	const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

	// Determine message and colors based on percentage
	const getAnalytics = (pct: number): {
		message: string
		headerColor: string
		borderColor: string
		textColor: string
		bgColor: string
	} => {
		if (pct >= 90) {
			return {
				message: "AMAZING",
				headerColor: "bg-green-400",
				borderColor: "border-green-400",
				textColor: "text-green-400",
				bgColor: "bg-green-50 dark:bg-green-950/20"
			}
		} else if (pct >= 80) {
			return {
				message: "GREAT",
				headerColor: "bg-blue-400",
				borderColor: "border-blue-400",
				textColor: "text-blue-400",
				bgColor: "bg-blue-50 dark:bg-blue-950/20"
			}
		} else if (pct >= 70) {
			return {
				message: "GOOD",
				headerColor: "bg-yellow-400",
				borderColor: "border-yellow-400",
				textColor: "text-yellow-400",
				bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
			}
		} else if (pct >= 60) {
			return {
				message: "NICE",
				headerColor: "bg-orange-400",
				borderColor: "border-orange-400",
				textColor: "text-orange-400",
				bgColor: "bg-orange-50 dark:bg-orange-950/20"
			}
		} else {
			return {
				message: "KEEP PRACTICING",
				headerColor: "bg-red-400",
				borderColor: "border-red-400",
				textColor: "text-red-400",
				bgColor: "bg-red-50 dark:bg-red-950/20"
			}
		}
	}

	const analytics = getAnalytics(percentage)

	return (
		<div className="w-80 mx-auto">
			{/* Header with message */}
			<div className={cn(
				"rounded-t-2xl px-6 py-3 text-center",
				analytics.headerColor
			)}>
				<h2 className="text-lg font-bold text-gray-900 tracking-wide">
					{analytics.message}
				</h2>
			</div>

			{/* Main content area */}
			<div className={cn(
				"rounded-b-2xl border-2 border-t-0 p-8 text-center",
				analytics.borderColor,
				analytics.bgColor
			)}>
				{/* Icon and percentage */}
				<div className="flex items-center justify-center gap-4 mb-4">
					<Target className={cn("size-12", analytics.textColor)} />
					<span className={cn(
						"text-5xl font-bold",
						analytics.textColor
					)}>
						{percentage}%
					</span>
				</div>

				{/* Questions correct subtitle */}
				<p className="text-lg text-wolf">
					{score} out of {totalQuestions} questions correct
				</p>
			</div>
		</div>
	)
}

export default observer(ScoreAnalyticsCard)
