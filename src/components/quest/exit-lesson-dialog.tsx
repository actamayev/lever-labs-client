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
import questClass from "../../classes/quest-class"
import { observer } from "mobx-react"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"

function ExitLessonDialog({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = questClass.getLesson(lessonId)

	const handleKeepLearning = useCallback((): void => {
		questClass.setIsExitDialogOpen(false)
	}, [])

	const handleEndSession = useCallback((): void => {
		// Reset lesson progress before navigating away
		if (lesson) questClass.resetLessonProgress(lessonId)
		navigate("/quest")
		stopCurrentlyRunningCode(true)
		questClass.setIsExitDialogOpen(false)
	}, [lesson, lessonId, navigate])

	return (
		<Dialog open={questClass.isExitDialogOpen} onOpenChange={questClass.setIsExitDialogOpen}>
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
