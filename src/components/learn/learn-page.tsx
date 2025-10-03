"use client"
import { observer } from "mobx-react"
import { useEffect, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import learnClass from "../../classes/learn-class"
import retrieveDetailedLesson from "../../utils/learn/retrieve-detailed-lesson"
import LessonHeader from "./lesson-header"
import LessonFooter from "./lesson-footer"

function LearnPage({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	useEffect((): void => {
		void retrieveDetailedLesson(lessonId)
	}, [lessonId])
	const isLoading = learnClass.isRetrievingDetailedData(lessonId)

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
				<LessonFooter />
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
				<LessonFooter />
			</div>
		)
	}

	return (
		<div className="h-screen flex flex-col">
			<LessonHeader lessonId={lessonId} />
			<main className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-[650px] py-6">
				<h1 className="text-2xl font-bold mb-4">{lesson.lessonName}</h1>
				{/* Lesson content will go here */}
			</main>
			<LessonFooter />
		</div>
	)
}

export default observer(LearnPage)
