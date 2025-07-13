"use client"

import { observer } from "mobx-react"
import { useState, useCallback, useEffect } from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { IncomingTeacherRequestData } from "@bluedotrobots/common-ts"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import CustomTooltip from "../custom-tooltip"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import editTeacherData from "../../utils/teacher/edit-teacher-data"
import requestBecomeTeacher from "../../utils/teacher/request-become-teacher"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/ui/card"

// eslint-disable-next-line max-lines-per-function, complexity
function RequestTeacherAccess() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [schoolName, setSchoolName] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const teacherData = teacherClass.teacherData
	const hasExistingData = teacherData !== null
	const colors = getDuolingoColors("humpback")

	// Pre-populate form with existing data
	useEffect(() => {
		if (!hasExistingData) return
		setFirstName(teacherData.teacherFirstName)
		setLastName(teacherData.teacherLastName)
		setSchoolName(teacherData.schoolName)
	}, [hasExistingData, teacherData])

	const clearErrorAndSuccess = useCallback(() => {
		setError("")
		setSuccess("")
	}, [])

	const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value)
		clearErrorAndSuccess()
	}, [clearErrorAndSuccess])

	const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value)
		clearErrorAndSuccess()
	}, [clearErrorAndSuccess])

	const handleSchoolNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSchoolName(e.target.value)
		clearErrorAndSuccess()
	}, [clearErrorAndSuccess])

	const clearForm = useCallback(() => {
		setFirstName("")
		setLastName("")
		setSchoolName("")
		clearErrorAndSuccess()
	}, [clearErrorAndSuccess])

	const submitRequest = useCallback(async () => {
		setIsSubmitting(true)
		clearErrorAndSuccess()

		const teacherRequestData: IncomingTeacherRequestData = {
			teacherFirstName: firstName.trim(),
			teacherLastName: lastName.trim(),
			schoolName: schoolName.trim()
		}

		if (hasExistingData) {
			// Call edit function for existing teacher data
			await editTeacherData(teacherRequestData, setError, setSuccess)
		} else {
			// Call original request function for new applications
			await requestBecomeTeacher(teacherRequestData, setError, setSuccess, clearForm)
		}

		setIsSubmitting(false)
	}, [clearForm, clearErrorAndSuccess, firstName, lastName, schoolName, hasExistingData])

	// Check if form is valid - different logic for existing vs new applications
	const isFormValid = hasExistingData
		? (
			// For editing: both names must not be empty AND at least one name must have changed
			firstName.trim().length > 0 &&
			lastName.trim().length > 0 &&
			(
				firstName.trim() !== teacherData.teacherFirstName ||
				lastName.trim() !== teacherData.teacherLastName
			)
		)
		: firstName.trim().length > 0 && lastName.trim().length > 0 && schoolName.trim().length > 0

	// Get status message based on teacher data
	const getStatusMessage = () => {
		if (!hasExistingData) return null

		if (teacherData.isApproved === true) {
			return (
				<div className="flex items-center mb-4 text-chargingGreen text-sm font-medium">
					<CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
					<span>Your teacher account has been approved! You can update your information below.</span>
				</div>
			)
		} else if (teacherData.isApproved === null) {
			return (
				<div className="flex items-center mb-4 text-blue-600 text-sm font-medium">
					<AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
					<span>Your teacher application is still being reviewed. You can update your information below.</span>
				</div>
			)
		} else if (teacherData.isApproved === false) {
			return (
				<div className="flex items-center mb-4 text-cardinal text-sm font-medium">
					<AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
					<span>
						Your teacher application was not accepted.
						Please contact our support team at bluedotrobots@gmail.com for assistance.
					</span>
				</div>
			)
		}

		return null
	}

	// Determine if form should be disabled (when application was rejected)
	const isFormDisabled = hasExistingData && teacherData.isApproved === false

	// Get button text based on state
	const getButtonText = () => {
		if (isSubmitting) {
			return hasExistingData ? "UPDATING..." : "SUBMITTING..."
		}
		return hasExistingData ? "UPDATE" : "SUBMIT"
	}

	return (
		<div className="mt-10">
			<div className="mr-20">
				<div className="text-wolf text-2xl border-b-2 border-swan pb-2 font-medium">
					{hasExistingData ? "Teacher Account" : "Become a Teacher"}
				</div>
				<div className="text-eel font-light mt-2">
					{hasExistingData
						? "Manage your teacher account information and view your approval status."
						: "Request teacher access to create classrooms, assign lessons, and track student progress."
					}
				</div>
			</div>
			<Card className="max-w-xl w-full my-8">
				<CardHeader className="px-4 md:px-6">
					<CardTitle className="text-xl md:text-2xl">
						{hasExistingData ? "Teacher Information" : "Request Teacher Access"}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 px-4 md:px-6">
					{getStatusMessage()}

					<div className="space-y-2">
						<Label
							htmlFor="teacher-first-name"
							className="text-base md:text-lg font-medium text-eel mb-2 block"
						>
						First Name
						</Label>
						<Input
							id="teacher-first-name"
							type="text"
							value={firstName}
							onChange={handleFirstNameChange}
							disabled={isFormDisabled}
							className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
						/>
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="teacher-last-name"
							className="text-base md:text-lg font-medium text-eel mb-2 block"
						>
						Last Name
						</Label>
						<Input
							id="teacher-last-name"
							type="text"
							value={lastName}
							onChange={handleLastNameChange}
							disabled={isFormDisabled}
							className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Label
								htmlFor="school-name"
								className="text-base md:text-lg font-medium text-eel mb-2 block"
							>
							School Name
							</Label>
							{hasExistingData && (
								<CustomTooltip
									tooltipTrigger={
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="h-auto p-1.5 hover:bg-polar"
										>
											<Info className="!h-4 !w-4 text-gray-500" />
										</Button>
									}
									tooltipContent="School name cannot be edited after submission"
								/>
							)}
						</div>
						<Input
							id="school-name"
							type="text"
							value={schoolName}
							onChange={handleSchoolNameChange}
							disabled={hasExistingData || isFormDisabled}
							className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
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
				</CardContent>
				<CardFooter className="px-4 md:px-6">
					<TactileButton
						onClick={submitRequest}
						disabled={!isFormValid || isSubmitting || isFormDisabled}
						className={cn("duration-150 text-white h-10 rounded-2xl mt-5 text-xl w-full sm:w-auto", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow}
					>
						{getButtonText()}
					</TactileButton>
				</CardFooter>
			</Card>
		</div>
	)
}

export default observer(RequestTeacherAccess)
