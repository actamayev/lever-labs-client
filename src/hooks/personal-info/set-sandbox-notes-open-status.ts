"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSetSandboxNotesOpenStatus(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const toast = useToastOptions()

	return useCallback(async () => {
		try {
			const newStatus = !personalInfoClass.sandboxNotesOpen
			if (isNull(blueDotApiClient.httpClient.accessToken)) return
			const siteThemeResponse = await blueDotApiClient.personalInfoDataService.setSandboxNotesOpenStatus(newStatus)
			if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
				throw Error("Unable to save sandbox notes open status")
			}
			personalInfoClass.setSandboxNotesOpen(newStatus)
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to save notebook open status",
				description: "Please reload the page and try again"
			})
		}
	}, [personalInfoClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, toast])
}
