"use client"

import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../shadcn/ui/dialog"
import { Input } from "../shadcn/ui/input"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import createScoreboard from "../../utils/teacher/scoreboard/create-scoreboard"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"

interface Props {
	classCode: ClassCode
	isCreateScoreboardDialogOpen: boolean
	setIsCreateScoreboardDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateScoreboardDialog(props: Props): React.ReactNode {
	const { classCode, isCreateScoreboardDialogOpen, setIsCreateScoreboardDialogOpen } = props
	const [scoreboardName, setScoreboardName] = useState("")
	const [error, setError] = useState("")
	const [isCreating, setIsCreating] = useState(false)
	const colors = getDuolingoColors("humpback")
	const navigate = useTypedNavigate()

	const handleCancelCreate = useCallback((): void => {
		setIsCreateScoreboardDialogOpen(false)
		setScoreboardName("")
		setError("")
	}, [setIsCreateScoreboardDialogOpen])

	const handleCreateScoreboard = useCallback(async (): Promise<void> => {
		if (!scoreboardName.trim()) {
			setError("Scoreboard name is required")
			return
		}

		setIsCreating(true)
		setError("")

		try {
			const createdScoreboard = await createScoreboard(classCode, scoreboardName)
			if (createdScoreboard) {
				navigate(`/scoreboard/${createdScoreboard.scoreboardId}`)
			}

			// Success - close dialog and reset form
			setIsCreateScoreboardDialogOpen(false)
			setScoreboardName("")
		} catch (err) {
			console.error("Error creating scoreboard:", err)
			setError("Failed to create scoreboard. Please try again.")
		}

		setIsCreating(false)
	}, [classCode, scoreboardName, setIsCreateScoreboardDialogOpen, navigate])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleCancelCreate()
		} else if (e.key === "Enter" && !isCreating && scoreboardName.trim()) {
			void handleCreateScoreboard()
		}
	}, [handleCancelCreate, handleCreateScoreboard, isCreating, scoreboardName])

	const isFormValid = scoreboardName.trim()

	return (
		<Dialog open={isCreateScoreboardDialogOpen} onOpenChange={setIsCreateScoreboardDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Create Scoreboard</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label htmlFor="scoreboardName" className="block text-sm font-medium text-wolf mb-2">
							Scoreboard Name
						</label>
						<Input
							id="scoreboardName"
							value={scoreboardName}
							onChange={(e): void => setScoreboardName(e.target.value)}
							placeholder="Enter scoreboard name"
							className="w-full !text-xl h-10"
							onKeyDown={handleKeyDown}
							autoFocus
							maxLength={50}
							disabled={isCreating}
						/>
					</div>

					{error && <p className="text-cardinal text-sm">{error}</p>}
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelCreate}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
						disabled={isCreating}
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleCreateScoreboard}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={isCreating || !isFormValid}
					>
						{isCreating ? "CREATING..." : "CREATE"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
