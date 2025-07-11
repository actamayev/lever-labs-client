"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle } from "lucide-react"
import { IncomingClassroomData, ClassCode } from "@bluedotrobots/common-ts"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Textarea } from "../shadcn/ui/textarea"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import createClassroom from "../../utils/teacher/create-classroom"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../shadcn/ui/dialog"

interface CreateClassroomDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

// eslint-disable-next-line max-lines-per-function
export default function CreateClassroomDialog({ isOpen, onOpenChange }: CreateClassroomDialogProps) {
	const [classroomName, setClassroomName] = useState("")
	const [classroomDescription, setClassroomDescription] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const router = useRouter()

	const colors = getDuolingoColors("humpback")

	const handleSubmit = useCallback(async () => {
		if (!classroomName.trim()) {
			setError("Classroom name is required")
			return
		}

		setIsSubmitting(true)

		const classroomData: IncomingClassroomData = {
			classroomName: classroomName.trim(),
			classroomDescription: classroomDescription.trim() || undefined
		}

		await createClassroom(
			classroomData,
			setError,
			setSuccess,
			(classCode: ClassCode) => {
				// Close dialog and redirect to new classroom
				onOpenChange(false)
				router.push(`/c/${classCode}`)
			}
		)

		setIsSubmitting(false)
	}, [classroomName, classroomDescription, onOpenChange, router])

	const handleClose = useCallback(() => {
		// Reset form when closing
		setClassroomName("")
		setClassroomDescription("")
		setError("")
		setSuccess("")
		onOpenChange(false)
	}, [onOpenChange])

	const isFormValid = classroomName.trim().length > 0

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Create New Classroom</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="classroom-name" className="text-base font-medium text-eel">
							Classroom Name *
						</Label>
						<Input
							id="classroom-name"
							type="text"
							value={classroomName}
							onChange={(e) => {
								setClassroomName(e.target.value)
								if (error || success) {
									setError("")
									setSuccess("")
								}
							}}
							className="w-full h-10 text-lg bg-polar !text-eel font-light border-swan"
							placeholder="The awesome robotics class"
							disabled={isSubmitting}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="classroom-description" className="text-base font-medium text-eel">
							Description (Optional)
						</Label>
						<Textarea
							id="classroom-description"
							value={classroomDescription}
							onChange={(e) => {
								setClassroomDescription(e.target.value)
								if (error || success) {
									setError("")
									setSuccess("")
								}
							}}
							className="w-full min-h-20 text-lg bg-polar !text-eel font-light border-swan resize-none"
							placeholder="Brief description of the classroom..."
							disabled={isSubmitting}
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

					<div className="flex gap-3 pt-4">
						<TactileButton
							onClick={handleClose}
							disabled={isSubmitting}
							className="flex-1 h-10 rounded-xl text-lg border border-swan bg-polar text-eel hover:bg-gray-50"
							shadowHeight={2}
							shadowClass="shadow-gray-300"
						>
							Cancel
						</TactileButton>
						<TactileButton
							onClick={handleSubmit}
							disabled={!isFormValid || isSubmitting}
							className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow}
						>
							{isSubmitting ? "Creating..." : "Create Classroom"}
						</TactileButton>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
