"use client"

import { SandboxProject } from "@bluedotrobots/common-ts"
import { Dispatch, SetStateAction, useCallback } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../../shadcn/ui/dialog"
import { Input } from "../../shadcn/ui/input"
import editSandboxProjectName from "../../../utils/sandbox/edit-sandbox-project-name"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { cn } from "../../../lib/shadcn/utils"
import { getDuolingoColors } from "../../../utils/get-duolingo-colors"

interface Props {
	project: SandboxProject
	isRenameDialogOpen: boolean
	setIsRenameDialogOpen: Dispatch<SetStateAction<boolean>>
	newProjectName: string
	setNewProjectName: Dispatch<SetStateAction<string>>
}

export default function RenameProjectDialog(props: Props) {
	const { project, isRenameDialogOpen, setIsRenameDialogOpen, newProjectName, setNewProjectName } = props

	const colors = getDuolingoColors("humpback")

	const handleCancelRename = useCallback(() => {
		setIsRenameDialogOpen(false)
	}, [setIsRenameDialogOpen])

	const handleSaveRename = useCallback(async () => {
		await editSandboxProjectName(project.projectUUID, newProjectName)
		setIsRenameDialogOpen(false)
	}, [project.projectUUID, newProjectName, setIsRenameDialogOpen])

	return (
		<Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e) => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Rename</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div>
					<Input
						value={newProjectName}
						onChange={(e) => setNewProjectName(e.target.value)}
						placeholder="Project name"
						className="w-full !text-xl h-10"
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								handleCancelRename()
							} else if (e.key === "Enter") {
								handleSaveRename()
							}
						}}
						autoFocus
					/>
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelRename}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleSaveRename}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						SAVE
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
