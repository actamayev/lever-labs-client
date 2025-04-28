"use client"

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
import { Button } from "../../shadcn/ui/button"
import useEditSandboxProjectName from "../../../hooks/sandbox/edit-sandbox-project-name"
import { SandboxProject } from "@bluedotrobots/common-ts"

interface Props {
	project: SandboxProject
	isRenameDialogOpen: boolean
	setIsRenameDialogOpen: Dispatch<SetStateAction<boolean>>
	newProjectName: string
	setNewProjectName: Dispatch<SetStateAction<string>>
}

export default function RenameProjectDialog(props: Props) {
	const { project, isRenameDialogOpen, setIsRenameDialogOpen, newProjectName, setNewProjectName } = props
	const editSandboxProjectName = useEditSandboxProjectName()

	const handleCancelRename = useCallback(() => {
		setIsRenameDialogOpen(false)
	}, [setIsRenameDialogOpen])

	const handleSaveRename = useCallback(async () => {
		await editSandboxProjectName(project.projectUUID, newProjectName)
		setIsRenameDialogOpen(false)
	}, [editSandboxProjectName, project.projectUUID, newProjectName, setIsRenameDialogOpen])

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
					<Button variant="outline" onClick={handleCancelRename}>Cancel</Button>
					<Button onClick={handleSaveRename}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
