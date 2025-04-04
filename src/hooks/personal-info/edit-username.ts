"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useEditUsername(): (newUsername: string) => Promise<void> {
	const personalInfoClass = usePersonalInfoContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (newUsername: string) => {
		try {
			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				newUsername === personalInfoClass.username ||
				newUsername.length < 3 ||
				newUsername.length > 100
			) return

			const updateNameResponse = await blueDotApiClient.personalInfoDataService.updateUsername(newUsername)
			if (!isEqual(updateNameResponse.status, 200) || isNonSuccessResponse(updateNameResponse.data)) {
				throw Error
			}

			personalInfoClass.setUsername(newUsername)
		} catch (error) {
			// TODO: Show if unable to save bc someone else has that username
			console.error(error)
			toast.negative({
				title: "Unable to edit username",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, personalInfoClass, toast])
}
