"use client"

import { useState, useCallback, useMemo } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import joinClassroom from "../../utils/student/join-classroom"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { isValidClassCode } from "../../utils/validate-class-code"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../shadcn/ui/dialog"

interface CreateClassroomDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function JoinClassroomDialog({ isOpen, onOpenChange }: CreateClassroomDialogProps) {
	const [classCode, setClassCode] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const navigate = useTypedNavigate()

	const colors = getDuolingoColors("humpback")

	const clearErrorAndSuccess = useCallback(() => {
		setError("")
		setSuccess("")
	}, [])

	const handleSubmit = useCallback(async () => {
		if (!isValidClassCode(classCode)) return
		clearErrorAndSuccess()
		const joinedClassroom = await joinClassroom(classCode, setError, setSuccess)
		if (!joinedClassroom) return
		navigate(`/whiteboard/${classCode}`)
	}, [classCode, clearErrorAndSuccess, navigate])

	const handleClose = useCallback(() => {
		setClassCode("")
		clearErrorAndSuccess()
		onOpenChange(false)
	}, [clearErrorAndSuccess, onOpenChange])

	const isFormValid = isValidClassCode(classCode)

	const borderColor = useMemo(() => {
		if (error) return "border-cardinal"
		if (success) return "border-chargingGreen"
		return "border-swan"
	}, [error, success])

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Join a classroom</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-2">
					<Label htmlFor="class-name" className="text-base font-medium text-eel">
						Class Code
					</Label>
					<Input
						id="class-code"
						type="text"
						value={classCode}
						onChange={(e) => {
							setClassCode(e.target.value)
							clearErrorAndSuccess()
						}}
						className={cn(
							"w-full pr-14 h-10 md:h-12 text-lg md:!text-xl bg-polar !text-eel font-light shadow-none",
							borderColor
						)}
						maxLength={5}
						placeholder="APPLE"
					/>
				</div>

				{error && (
					<div className="flex items-center mt-2 text-cardinal text-sm font-medium">
						<AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
						<span>{error}</span>
					</div>
				)}

				{success && (
					<div className="flex items-center mt-2 text-chargingGreen text-sm font-medium">
						<CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
						<span>{success}</span>
					</div>
				)}

				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={handleClose}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleSubmit}
						disabled={!isFormValid}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						JOIN
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
