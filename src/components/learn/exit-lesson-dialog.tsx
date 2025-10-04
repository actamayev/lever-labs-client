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

interface Props {
	isExitDialogOpen: boolean
	setIsExitDialogOpen: (open: boolean) => void
	onKeepLearning: () => void
	onEndSession: () => void
}

export default function ExitLessonDialog(props: Props): React.ReactNode {
	const { isExitDialogOpen, setIsExitDialogOpen, onKeepLearning, onEndSession } = props

	const handleKeepLearning = useCallback((): void => {
		onKeepLearning()
		setIsExitDialogOpen(false)
	}, [onKeepLearning, setIsExitDialogOpen])

	const handleEndSession = useCallback((): void => {
		onEndSession()
		setIsExitDialogOpen(false)
	}, [onEndSession, setIsExitDialogOpen])

	return (
		<Dialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Wait, don't go!</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="py-4">
					<p className="text-lg text-eel dark:text-swan">
						You'll lose your progress if you quit now
					</p>
				</div>
				<div className="flex flex-col gap-3 items-center">
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
