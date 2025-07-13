"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { ClassCode } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import studentClass from "../../classes/student-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

// eslint-disable-next-line complexity
export default async function joinClassroom(
	classCode: ClassCode,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>
) : Promise<boolean> {
	try {
		if (authClass.isFinishedWithSignup === false) return false

		const joinClassResponse = await blueDotApiClientClass.studentDataService.joinClass(classCode)

		if (!isEqual(joinClassResponse.status, 200) || isNonSuccessResponse(joinClassResponse.data)) {
			throw Error("Unable to join class")
		}
		studentClass.addClassroomData({...joinClassResponse.data})
		return true
	} catch (error: unknown) {
		console.error(error)

		// Handle axios error responses
		if (error instanceof AxiosError) {
			const { status, response } = error

			if (status === 400) {
				// eslint-disable-next-line max-depth
				if (response?.data.message === "You are already in this class") {
					setSuccess("You're already in this class!")
					return true
				} else if (response?.data.message === "This class code does not exist") {
					setError("This class code doesn't exist. Please check and try again.")
					return false
				} else if (response?.data.validationError) {
					setError("Invalid class code format. Please enter a valid 5-character code.")
					return false
				}
			}

			if (status === 500) {
				setError("Server error. Please try again later.")
				return false
			}
		}

		// Fallback for network errors or other issues
		setError("Unable to join class. Please check your connection and try again.")
		return false
	}
}
