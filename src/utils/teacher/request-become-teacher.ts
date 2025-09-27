"use client"

import { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import { IncomingTeacherRequestData } from "@lever-labs/common-ts/types/api"
import authClass from "../../classes/auth-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

// eslint-disable-next-line complexity
export default async function requestBecomeTeacher(
	data: IncomingTeacherRequestData,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		const response = await leverLabsApiClient.teacherDataService.requestBecomeTeacher(data)

		if (response.status !== 200) {
			setError("Failed to submit teacher request")
			return
		}

		setSuccess("Teacher request submitted successfully! You'll be notified when approved.")
		setError("")
	} catch (error: unknown) {
		console.error(error)

		// Handle axios error responses
		if (error instanceof AxiosError) {
			const { status, response } = error

			if (status === 400) {
				// eslint-disable-next-line max-depth
				if (response?.data.message === "You have already been approved to be a teacher") {
					setSuccess("You're already an approved teacher! You can create classrooms and manage students.")
					setError("")
				// eslint-disable-next-line max-len
				} else if (response?.data.message === "Your application to be a teacher was not accepted. Please contact our support team") {
					setError("Your previous teacher application was not accepted. Please contact our support team for assistance.")
				} else if (response?.data.message === "Your application to be a teacher is being processed") {
					setError("Your application to be a teacher is being processed.")
				} else if (response?.data.validationError) {
					setError("Please ensure all fields are filled in correctly.")
				} else {
					setError(response?.data.message || "Invalid request data")
				}
				return
			}

			if (status === 500) {
				setError("Server error. Please try again later.")
				return
			}
		}

		setError("Unable to submit teacher request. Please check your connection and try again.")
	}
}
