"use client"

import { useCallback } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "../shadcn/ui/dialog"
import { TactileButton } from "../shadcn/ui/tactile-button"
import learnClass from "../../classes/learn-class"
import { observer } from "mobx-react"

function ExitLessonDialog({ onEndSession }: { onEndSession: () => void }): React.ReactNode {
	const handleKeepLearning = useCallback((): void => {
		learnClass.setIsExitDialogOpen(false)
	}, [])

	const handleEndSession = useCallback((): void => {
		onEndSession()
		learnClass.setIsExitDialogOpen(false)
	}, [onEndSession])

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
						className="w-full h-10 rounded-xl text-lg text-white bg-macaw"
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
