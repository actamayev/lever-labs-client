/* eslint-disable max-depth */
"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse, isValidationErrorResponse } from "../../utils/type-checks"

export default function useChangePassword(): (
	oldPassword: string,
	newPassword: string
) => Promise<string | null> {
	const toast = useToastOptions()

	// eslint-disable-next-line complexity
	return useCallback(async (
		oldPassword: string,
		newPassword: string
	) => {
		try {
			if (isNull(blueDotApiClientClass.httpClient.accessToken)) {
				return "You must be logged in to change your password"
			}

			if (oldPassword === newPassword) {
				return "New password must be different from your current password"
			}

			if (oldPassword.length < 6) {
				return "Current password must be at least 6 characters"
			}

			if (newPassword.length < 6) {
				return "New password must be at least 6 characters"
			}

			const updatePasswordResponse = await blueDotApiClientClass.personalInfoDataService.changePassword(
				oldPassword, newPassword
			)

			if (!isEqual(updatePasswordResponse.status, 200) || isNonSuccessResponse(updatePasswordResponse.data)) {
				throw Error("Unable to change password")
			}

			toast.positive({
				title: "Password updated successfully"
			})
			return null // Success, no error
		} catch (error: unknown) {
			console.error(error)
			if (error instanceof AxiosError) {
				// Check for specific error types
				if (error.response?.status === 400) {
					if (isMessageResponse(error.response.data)) {
						if (error.response.data.message === "Wrong password. Please try again.") {
							return "Incorrect current password"
						}
						if (error.response.data.message === "Your new password can't be the same as the old password") {
							return "New password can't be the same as your current password"
						}
						if (error.response.data.message === "Please log in with Google") {
							return "Password change not available for Google accounts"
						}
						return error.response.data.message
					}
					if (isValidationErrorResponse(error.response.data) && error.response.data.validationError) {
						return error.response.data.validationError
					}
					return "Invalid password format"
				}

				if (error.response?.status === 500) {
					toast.negative({
						title: "Server error",
						description: "Please try again later"
					})
					return "Server error occurred"
				}
			}

			toast.negative({
				title: "Unable to change password",
				description: "Please reload the page and try again"
			})
			return "An unexpected error occurred"
		}
	}, [toast])
}
