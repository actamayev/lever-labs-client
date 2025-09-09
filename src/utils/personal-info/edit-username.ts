/* eslint-disable max-depth */
"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse, isValidationErrorResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default async function editUsername(newUsername: string) : Promise<string | null> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) {
			return "You must be logged in to update your username"
		}

		if (newUsername === getPersonalInfoClass().username) {
			return null // No change, no error
		}

		if (newUsername.length < 3) {
			return "Username must be at least 3 characters"
		}

		if (newUsername.length > 50) {
			return "Username cannot exceed 50 characters"
		}

		const updateNameResponse = await getBlueDotApiClientClass().personalInfoDataService.updateUsername(newUsername)

		if (!isEqual(updateNameResponse.status, 200) || isNonSuccessResponse(updateNameResponse.data)) {
			throw Error
		}

		getPersonalInfoClass().setUsername(newUsername)
		return null // Success, no error
	} catch (error: unknown) {
		console.error(error)
		if (error instanceof AxiosError) {
			// Check for specific error types
			if (error.response?.status === 400) {
				if (isMessageResponse(error.response.data) && error.response.data.message === "This username is taken") {
					return "This username is already taken"
				}
				if (isValidationErrorResponse(error.response.data) && error.response.data.validationError) {
					return error.response.data.validationError
				}
				return "Username is invalid"
			}

			if (error.response?.status === 500) {
				getToastClass().negative({
					title: "Server error",
					description: "Please try again later"
				})
				return "Server error occurred"
			}
		}

		// Add a default return for any other error case
		getToastClass().negative({
			title: "Unable to edit username",
			description: "Please reload the page and try again"
		})
		return "An unexpected error occurred"
	}
}
