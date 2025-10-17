"use client"
import { observer } from "mobx-react"
import { useEffect, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import learnClass from "../../classes/learn-class"
import retrieveDetailedLesson from "../../utils/learn/retrieve-detailed-lesson"
import LessonHeader from "./lesson-header"
import LessonFooter from "./lesson-footer"
import LessonQuestions from "./lesson-questions"
import { soundManager } from "../../classes/utility/sound-manager-class"

function LearnPage({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	useEffect((): void => {
		void retrieveDetailedLesson(lessonId)
	}, [lessonId])
	const isLoading = learnClass.isRetrievingDetailedData(lessonId)
	useEffect((): void => soundManager.initialize(), [])

	const lesson = useMemo((): Lesson | undefined => {
		return learnClass.getLesson(lessonId)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessonId, learnClass.lessonsById.size])

	if (isLoading) {
		return (
			<div className="h-screen flex flex-col">
				<LessonHeader lessonId={lessonId} />
				<div className="flex-1 flex items-center justify-center">
					<h1 className="text-xl">Loading...</h1>
				</div>
				<LessonFooter lessonId={lessonId} />
			</div>
		)
	}

	if (!lesson) {
		return (
			<div className="h-screen flex flex-col">
				<LessonHeader lessonId={lessonId} />
				<div className="flex-1 flex items-center justify-center">
					<h1 className="text-xl">Lesson not found</h1>
				</div>
				<LessonFooter lessonId={lessonId} />
			</div>
		)
	}

	return (
		<div className="h-screen flex flex-col">
			<LessonHeader lessonId={lessonId} />
			<main className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
				<LessonQuestions lessonId={lessonId} />
			</main>
			<LessonFooter lessonId={lessonId} />
		</div>
	)
}

export default observer(LearnPage)
