"use client"

import { useCallback } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "../ui/dialog"
import { TactileButton } from "../buttons/tactile-button"
import learnClass from "../../classes/learn-class"
import { observer } from "mobx-react"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import stopCareerTrigger from "../../utils/career-quest/stop-career-trigger"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

function ExitLessonDialog({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = learnClass.getLesson(lessonId)

	const handleKeepLearning = useCallback((): void => {
		learnClass.setIsExitDialogOpen(false)
	}, [])

	const handleEndSession = useCallback((): void => {
		// Reset lesson progress before navigating away
		if (lesson) learnClass.resetLessonProgress(lessonId)
		navigate("/learn")
		stopCareerTrigger()
		learnClass.setIsExitDialogOpen(false)
	}, [lesson, lessonId, navigate])

	return (
		<Dialog open={learnClass.isExitDialogOpen} onOpenChange={learnClass.setIsExitDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Wait, don't go!</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="py-4">
					<p className="text-lg text-eel">
						You'll lose your progress if you quit now
					</p>
				</div>
				<div className="flex flex-col gap-4 items-center">
					<TactileButton
						onClick={handleKeepLearning}
						className="w-full h-10 rounded-xl text-lg text-white bg-macaw duration-0"
						shadowHeight={4}
						shadowClass="shadow-macaw-2"
						shouldHoverPushButton={false}
					>
						KEEP LEARNING
					</TactileButton>
					<button
						onClick={handleEndSession}
						className="text-cardinal text-lg font-medium"
					>
						END SESSION
					</button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(ExitLessonDialog)
