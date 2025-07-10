import { AxiosError } from "axios"
import authClass from "../../classes/auth-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { IncomingTeacherRequestData } from "@bluedotrobots/common-ts"

// eslint-disable-next-line complexity
export default async function requestBecomeTeacher(data: IncomingTeacherRequestData): Promise<TeacherRequestResult> {
	try {
		if (authClass.isFinishedWithSignup === false) {
			return {
				isSuccess: false,
				message: "Please complete signup first."
			}
		}

		const response = await blueDotApiClientClass.teacherDataService.requestBecomeTeacher(data)

		if (response.status !== 200) {
			return {
				isSuccess: false,
				message: "Failed to submit teacher request"
			}
		}

		return {
			isSuccess: true,
			message: "Teacher request submitted successfully! You'll be notified when approved."
		}
	} catch (error: unknown) {
		console.error(error)

		// Handle axios error responses
		if (error instanceof AxiosError) {
			const { status, response } = error

			if (status === 400) {
				// eslint-disable-next-line max-depth
				if (response?.data.message === "You have already been approved to be a teacher") {
					return {
						isSuccess: true,
						message: "You're already an approved teacher! You can create classrooms and manage students."
					}
				// eslint-disable-next-line max-len
				} else if (response?.data.message === "Your application to be a teacher was not accepted. Please contact our support team") {
					return {
						isSuccess: false,
						message: "Your previous teacher application was not accepted. Please contact our support team for assistance."
					}
				} else if (response?.data.validationError) {
					return {
						isSuccess: false,
						message: "Please ensure all fields are filled in correctly."
					}
				} else {
					return {
						isSuccess: false,
						message: response?.data.message || "Invalid request data"
					}
				}
			}

			if (status === 500) {
				return {
					isSuccess: false,
					message: "Server error. Please try again later."
				}
			}
		}

		return {
			isSuccess: false,
			message: "Unable to submit teacher request. Please check your connection and try again."
		}
	}
}
