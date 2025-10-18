"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
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
import sandboxClass from "../../../classes/sandbox-class"

function RenameProjectDialog(): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	const handleSaveRename = useCallback(async (): Promise<void> => {
		if (!sandboxClass.renameDialogProjectUUID) return

		await editSandboxProjectName(sandboxClass.renameDialogProjectUUID, sandboxClass.newProjectName)
		sandboxClass.updateProjectName(sandboxClass.renameDialogProjectUUID, sandboxClass.newProjectName)
		sandboxClass.closeRenameDialog()
	}, [])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			sandboxClass.closeRenameDialog()
		} else if (e.key === "Enter") {
			handleSaveRename()
		}
	}, [handleSaveRename])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		sandboxClass.setNewProjectName(e.target.value)
	}, [])

	return (
		<Dialog open={sandboxClass.isRenameDialogOpen} onOpenChange={sandboxClass.closeRenameDialog}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Rename</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<Input
					id="projectName"
					value={sandboxClass.newProjectName}
					onChange={handleInputChange}
					placeholder="Project name"
					className="w-full !text-xl h-10"
					onKeyDown={handleKeyDown}
					autoFocus={true}
					maxLength={50}
				/>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={sandboxClass.closeRenameDialog}
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
