"use client"

import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { UUID } from "crypto"
import { ClassCode } from "@bluedotrobots/common-ts"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../shadcn/ui/dialog"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { cn } from "../../lib/shadcn/utils"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import deleteHub from "../../utils/teacher/delete-hub"

interface Props {
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>
	hubName: string
	hubId: UUID
	classCode: ClassCode
}

export default function DeleteHubDialog(props: Props): React.ReactNode {
	const { isDeleteDialogOpen, setIsDeleteDialogOpen, hubName, hubId, classCode } = props
	const [isDeleting, setIsDeleting] = useState(false)

	const colors = getDuolingoColors("cardinal")

	const handleCancelDelete = useCallback((): void => {
		setIsDeleteDialogOpen(false)
	}, [setIsDeleteDialogOpen])

	const handleConfirmDelete = useCallback(async (): Promise<void> => {
		setIsDeleting(true)

		try {
			await deleteHub(classCode, hubId)
			setIsDeleteDialogOpen(false)
		} catch (error) {
			console.error("Error deleting hub:", error)
		}

		setIsDeleting(false)
	}, [classCode, hubId, setIsDeleteDialogOpen])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleCancelDelete()
		}
	}, [handleCancelDelete])

	return (
		<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl flex items-center gap-2">
						<AlertTriangle className="h-6 w-6 text-cardinal" />
						Delete Hub
					</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4" onKeyDown={handleKeyDown}>
					<div className="bg-cardinal/10 border border-cardinal/20 rounded-lg p-4">
						<p className="text-wolf text-lg mb-2">
							Are you sure you want to delete this hub?
						</p>
						<div className="bg-white border border-cardinal/30 rounded-lg p-3">
							<div className="text-sm text-eel mb-1">Hub Name</div>
							<div className="text-lg font-semibold text-wolf">
								{hubName}
							</div>
						</div>
					</div>

					<div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
						<p className="text-amber-800 text-sm">
							<strong>Warning:</strong> This action cannot be undone. All students will be removed from this hub and any
							progress will be lost.
						</p>
					</div>
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelDelete}
						className="flex-1 h-10 rounded-xl text-lg text-wolf bg-polar border border-swan hover:bg-gray-50"
						shadowHeight={4}
						shadowClass="shadow-gray-300"
						disabled={isDeleting}
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleConfirmDelete}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={isDeleting}
					>
						{isDeleting ? "DELETING..." : "DELETE HUB"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
