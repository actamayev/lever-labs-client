"use client"
import { observer } from "mobx-react"
import { useEffect, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import learnClass from "../../classes/learn-class"
import retrieveDetailedLesson from "../../utils/learn/retrieve-detailed-lesson"

function LearnPage({ lessonUUID }: { lessonUUID: LessonUUID }): React.ReactNode {
	useEffect((): void => {
		void retrieveDetailedLesson(lessonUUID)
	}, [lessonUUID])
	const isLoading = learnClass.isRetrievingDetailedData(lessonUUID)

	const lesson = useMemo((): Lesson | undefined => {
		return learnClass.getLesson(lessonUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessonUUID, learnClass.lessonsById])

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	if (!lesson) {
		return (
			<div>
				<h1>Lesson not found</h1>
			</div>
		)
	}

	return (
		<div>
			<h1>{lesson?.lessonName}</h1>
		</div>
	)
}

export default observer(LearnPage)
