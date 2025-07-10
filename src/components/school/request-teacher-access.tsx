"use client"

import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Button } from "../shadcn/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../shadcn/ui/card"
import requestBecomeTeacher from "../../utils/teacher/request-become-teacher"

// eslint-disable-next-line max-lines-per-function
function RequestTeacherAccess() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [schoolName, setSchoolName] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(e.target.value)
		// Clear messages when user starts typing
		if (error || success) {
			setError("")
			setSuccess("")
		}
	}, [error, success])

	const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(e.target.value)
		// Clear messages when user starts typing
		if (error || success) {
			setError("")
			setSuccess("")
		}
	}, [error, success])

	const handleSchoolNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSchoolName(e.target.value)
		// Clear messages when user starts typing
		if (error || success) {
			setError("")
			setSuccess("")
		}
	}, [error, success])

	const submitRequest = useCallback(async () => {
		setIsSubmitting(true)
		setError("")
		setSuccess("")

		const result = await requestBecomeTeacher({
			teacherFirstName: firstName.trim(),
			teacherLastName: lastName.trim(),
			schoolName: schoolName.trim()
		})

		if (result.isSuccess) {
			setSuccess(result.message)
			setFirstName("")
			setLastName("")
			setSchoolName("")
		} else {
			setError(result.message)
		}

		setIsSubmitting(false)
	}, [firstName, lastName, schoolName])

	// Check if form is valid
	const isFormValid = firstName.trim().length > 0 &&
		lastName.trim().length > 0 &&
		schoolName.trim().length > 0

	return (
		<Card className="mb-8 max-w-xl w-full">
			<CardHeader className="px-4 md:px-6">
				<CardTitle className="text-xl md:text-2xl">Request Teacher Access</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 px-4 md:px-6">
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
						className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
						placeholder="Enter your first name"
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
						className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
						placeholder="Enter your last name"
					/>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="school-name"
						className="text-base md:text-lg font-medium text-eel mb-2 block"
					>
						School Name
					</Label>
					<Input
						id="school-name"
						type="text"
						value={schoolName}
						onChange={handleSchoolNameChange}
						className="w-full h-10 md:h-12 text-lg md:!text-xl shadow-none
						bg-polar !text-eel font-light border-swan"
						placeholder="Enter your school name"
					/>
				</div>

				{error && (
					<p className="text-sm text-cardinal mt-1">
						{error}
					</p>
				)}

				{success && (
					<p className="text-sm text-green-600 mt-1">
						{success}
					</p>
				)}
			</CardContent>
			<CardFooter className="px-4 md:px-6">
				<Button
					onClick={submitRequest}
					disabled={!isFormValid || isSubmitting}
					className="w-full sm:w-auto"
				>
					{isSubmitting ? "SUBMITTING..." : "REQUEST ACCESS"}
				</Button>
			</CardFooter>
		</Card>
	)
}

export default observer(RequestTeacherAccess)
