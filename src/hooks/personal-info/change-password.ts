"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useChangePassword(): (
	oldPassword: string,
	newPassword: string
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (
		oldPassword: string,
		newPassword: string
	) => {
		try {
			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				oldPassword === newPassword ||
				oldPassword.length < 6 ||
				newPassword.length < 6
			) return

			const updateNameResponse = await blueDotApiClient.personalInfoDataService.changePassword(
				oldPassword, newPassword
			)
			if (!isEqual(updateNameResponse.status, 200) || isNonSuccessResponse(updateNameResponse.data)) {
				throw Error
			}
			toast.positive({
				title: "Password updated!"
			})
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to change password",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, toast])
}
