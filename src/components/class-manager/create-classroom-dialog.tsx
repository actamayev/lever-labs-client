"use client"

import { useState, useCallback } from "react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import createClassroom from "../../utils/teacher/create-classroom"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../shadcn/ui/dialog"

interface CreateClassroomDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function CreateClassroomDialog({ isOpen, onOpenChange }: CreateClassroomDialogProps): React.ReactNode {
	const [classroomName, setClassroomName] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const navigate = useTypedNavigate()

	const colors = getDuolingoColors("humpback")

	const clearErrorAndSuccess = useCallback((): void => {
		setError("")
		setSuccess("")
	}, [])

	const handleSubmit = useCallback(async (): Promise<void> => {
		if (!classroomName.trim()) {
			setError("Classroom name is required")
			return
		}

		setIsSubmitting(true)

		await createClassroom(
			classroomName.trim(),
			setError,
			setSuccess,
			(classCode: ClassCode): void => {
				onOpenChange(false)
				navigate(`/class-manager/${classCode}`)
			}
		)

		setIsSubmitting(false)
	}, [classroomName, onOpenChange, navigate])

	const handleClose = useCallback((): void => {
		setClassroomName("")
		clearErrorAndSuccess()
		onOpenChange(false)
	}, [clearErrorAndSuccess, onOpenChange])

	const isFormValid = classroomName.trim().length > 0

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create class</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-2">
					<Label htmlFor="class-name" className="text-base font-medium text-eel">
						Class Name
					</Label>
					<Input
						id="class-name"
						type="text"
						value={classroomName}
						onChange={(e): void => {
							setClassroomName(e.target.value)
							clearErrorAndSuccess()
						}}
						className="w-full h-10 text-lg bg-polar !text-eel font-light border-swan shadow-none"
						placeholder="The awesome robotics class"
						disabled={isSubmitting}
						maxLength={100}
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
						disabled={isSubmitting}
						className="flex-1 h-10 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
					>
						CANCEL
					</TactileButton>
					<TactileButton
						onClick={handleSubmit}
						disabled={!isFormValid || isSubmitting}
						className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						{isSubmitting ? "CREATING..." : "CREATE"}
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
