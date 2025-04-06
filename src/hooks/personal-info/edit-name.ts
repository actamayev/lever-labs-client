"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isErrorResponses } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useEditName(): (newName: string) => Promise<void> {
	const personalInfoClass = usePersonalInfoContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (newName: string) => {
		try {
			if (
				isNull(blueDotApiClient.httpClient.accessToken) ||
				newName === personalInfoClass.name
			) return

			const updateNameResponse = await blueDotApiClient.personalInfoDataService.updateName(newName)
			if (!isEqual(updateNameResponse.status, 200) || isErrorResponses(updateNameResponse.data)) {
				throw Error ("Unable to edit name")
			}

			personalInfoClass.setName(newName)
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to edit name",
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, personalInfoClass, toast])
}
