"use client"

import { useState, useCallback, useMemo } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import joinClassroom from "../../utils/student/join-classroom"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { isValidClassCode } from "../../utils/validate-class-code"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { ACCEPTABLE_CLASS_CODE_CHARACTERS } from "@lever-labs/common-ts/types/utils/constants"

interface CreateClassroomDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function JoinClassroomDialog({ isOpen, onOpenChange }: CreateClassroomDialogProps): React.ReactNode {
	const [classCode, setClassCode] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const navigate = useTypedNavigate()

	const colors = getDuolingoColors("humpback")

	const clearErrorAndSuccess = useCallback((): void => {
		setError("")
		setSuccess("")
	}, [])

	const handleSubmit = useCallback(async (): Promise<void> => {
		if (!isValidClassCode(classCode)) return
		clearErrorAndSuccess()
		const joinedClassroom = await joinClassroom(classCode, setError, setSuccess)
		if (!joinedClassroom) return
		navigate(`/whiteboard/${classCode}`)
	}, [classCode, clearErrorAndSuccess, navigate])

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value
		const characters = ACCEPTABLE_CLASS_CODE_CHARACTERS

		// Filter to only allowed characters
		const filteredValue = value
			.split("")
			.filter((char): boolean => characters.includes(char))
			.slice(0, 5) // Maximum 5 characters
			.join("")

		setClassCode(filteredValue)
		clearErrorAndSuccess()
	}, [clearErrorAndSuccess])

	const handleClose = useCallback((): void => {
		setClassCode("")
		clearErrorAndSuccess()
		onOpenChange(false)
	}, [clearErrorAndSuccess, onOpenChange])

	const isFormValid = isValidClassCode(classCode)

	const borderColor = useMemo((): string => {
		if (error) return "border-cardinal"
		if (success) return "border-charging-green"
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
						onChange={handleInputChange}
						className={cn(
							"w-full pr-14 h-10 md:h-12 text-lg md:text-xl! bg-polar text-eel! font-light shadow-none",
							borderColor
						)}
						maxLength={5}
						placeholder="apple"
					/>
				</div>

				{error && (
					<div className="flex items-center mt-2 text-cardinal text-sm font-medium">
						<AlertCircle className="w-4 h-4 mr-2 shrink-0" />
						<span>{error}</span>
					</div>
				)}

				{success && (
					<div className="flex items-center mt-2 text-charging-green text-sm font-medium">
						<CheckCircle className="w-4 h-4 mr-2 shrink-0" />
						<span>{success}</span>
					</div>
				)}

				<DialogFooter className="flex justify-end gap-2">
					<TactileButton
						onClick={(): void => handleClose()}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={(): void => void handleSubmit()}
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
