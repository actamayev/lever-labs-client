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
import getDuolingoColors from "../../utils/get-duolingo-colors"
import inviteStudent from "../../utils/teacher/invite-student"

interface Props {
	classCode: ClassCode
	isInviteDialogOpen: boolean
	setIsInviteDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function InviteStudentDialog(props: Props): React.ReactNode {
	const { classCode, isInviteDialogOpen, setIsInviteDialogOpen } = props
	const [username, setUsername] = useState("")
	const [error, setError] = useState("")
	const [isInviting, setIsInviting] = useState(false)

	const colors = getDuolingoColors("humpback")

	const handleCancelInvite = useCallback((): void => {
		setIsInviteDialogOpen(false)
		setUsername("")
		setError("")
	}, [setIsInviteDialogOpen])

	const handleSendInvite = useCallback(async (): Promise<void> => {
		if (!username.trim()) {
			setError("Username is required")
			return
		}

		setIsInviting(true)
		setError("")

		const success = await inviteStudent(classCode, username, setError)

		if (success) {
			setIsInviteDialogOpen(false)
			setUsername("")
		}

		setIsInviting(false)
	}, [classCode, username, setIsInviteDialogOpen])

	const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
		if (e.key === "Escape") {
			handleCancelInvite()
		} else if (e.key === "Enter" && !isInviting) {
			void handleSendInvite()
		}
	}, [handleCancelInvite, handleSendInvite, isInviting])

	return (
		<Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl">Invite Student</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-wolf mb-2">
							Username
						</label>
						<Input
							id="username"
							value={username}
							onChange={(e): void => setUsername(e.target.value)}
							placeholder="Enter student username"
							className="w-full !text-xl h-10"
							onKeyDown={handleKeyDown}
							autoFocus
							maxLength={50}
							disabled={isInviting}
						/>
					</div>

					<div className="bg-polar border border-swan rounded-lg p-3">
						<div className="text-sm text-eel mb-1">Class Code</div>
						<div className="font-mono text-lg font-bold text-wolf bg-white px-3 py-2 rounded border">
							{classCode}
						</div>
					</div>

					{error && <p className="text-cardinal text-sm">{error}</p>}
				</div>
				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleCancelInvite}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
						disabled={isInviting}
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleSendInvite}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={isInviting || !username.trim()}
					>
						{isInviting ? "INVITING..." : "SEND INVITE"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
