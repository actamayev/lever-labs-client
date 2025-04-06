/* eslint-disable max-depth */
"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isMessageResponse, isNonSuccessResponse, isValidationErrorResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useEditUsername(): (newUsername: string) => Promise<string | null> {
	const personalInfoClass = usePersonalInfoContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	// eslint-disable-next-line complexity
	return useCallback(async (newUsername: string) => {
		try {
			if (isNull(blueDotApiClient.httpClient.accessToken)) {
				return "You must be logged in to update your username"
			}

			if (newUsername === personalInfoClass.username) {
				return null // No change, no error
			}

			if (newUsername.length < 3) {
				return "Username must be at least 3 characters"
			}

			if (newUsername.length > 50) {
				return "Username cannot exceed 50 characters"
			}

			const updateNameResponse = await blueDotApiClient.personalInfoDataService.updateUsername(newUsername)

			if (!isEqual(updateNameResponse.status, 200) || isNonSuccessResponse(updateNameResponse.data)) {
				throw Error
			}

			personalInfoClass.setUsername(newUsername)
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
					toast.negative({
						title: "Server error",
						description: "Please try again later"
					})
					return "Server error occurred"
				}
			}

			// Add a default return for any other error case
			toast.negative({
				title: "Unable to edit username",
				description: "Please reload the page and try again"
			})
			return "An unexpected error occurred"
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, personalInfoClass, toast])
}
