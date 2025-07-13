"use client"

import { ClassCode } from "@bluedotrobots/common-ts"
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
import { getDuolingoColors } from "../../utils/duolingo-utils"
import editClassroomName from "../../utils/teacher/edit-classroom-name"

interface Props {
	classCode: ClassCode
	isRenameDialogOpen: boolean
	setIsRenameDialogOpen: Dispatch<SetStateAction<boolean>>
	newClassroomName: string
	setNewClassroomName: Dispatch<SetStateAction<string>>
}

export default function RenameClassroomDialog(props: Props) {
	const { classCode, isRenameDialogOpen, setIsRenameDialogOpen, newClassroomName, setNewClassroomName } = props
	const [error, setError] = useState("")

	const colors = getDuolingoColors("humpback")

	const handleCancelRename = useCallback(() => {
		setIsRenameDialogOpen(false)
	}, [setIsRenameDialogOpen])

	const handleSaveRename = useCallback(async () => {
		await editClassroomName(classCode, newClassroomName, setError)
		setIsRenameDialogOpen(false)
	}, [classCode, newClassroomName, setError, setIsRenameDialogOpen])

	return (
		<Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e) => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Rename Class</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div>
					<Input
						value={newClassroomName}
						onChange={(e) => setNewClassroomName(e.target.value)}
						placeholder="Class name"
						className="w-full !text-xl h-10"
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								handleCancelRename()
							} else if (e.key === "Enter") {
								handleSaveRename()
							}
						}}
						autoFocus
						maxLength={100}
					/>
					{error && <p className="text-cardinal">{error}</p>}
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelRename}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleSaveRename}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow}
					>
						SAVE
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
