"use client"

import { SandboxProject } from "@lever-labs/common-ts/types/sandbox"
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
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { observer } from "mobx-react"

interface Props {
	project: SandboxProject
	isRenameDialogOpen: boolean
	setIsRenameDialogOpen: Dispatch<SetStateAction<boolean>>
	newProjectName: string
	setNewProjectName: Dispatch<SetStateAction<string>>
}

function RenameProjectDialog(props: Props): React.ReactNode {
	const { project, isRenameDialogOpen, setIsRenameDialogOpen, newProjectName, setNewProjectName } = props

	const colors = getDuolingoColors("humpback")

	const handleCancelRename = useCallback((): void => {
		setIsRenameDialogOpen(false)
	}, [setIsRenameDialogOpen])

	const handleSaveRename = useCallback(async (): Promise<void> => {
		await editSandboxProjectName(project.sandboxProjectUUID, newProjectName)
		setIsRenameDialogOpen(false)
	}, [project.sandboxProjectUUID, newProjectName, setIsRenameDialogOpen])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleCancelRename()
		} else if (e.key === "Enter") {
			handleSaveRename()
		}
	}, [handleCancelRename, handleSaveRename])

	return (
		<Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Rename</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<Input
					id="projectName"
					value={newProjectName}
					onChange={(e): void => setNewProjectName(e.target.value)}
					placeholder="Project name"
					className="w-full !text-xl h-10"
					onKeyDown={handleKeyDown}
					autoFocus
					maxLength={50}
				/>
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

export default observer(RenameProjectDialog)
