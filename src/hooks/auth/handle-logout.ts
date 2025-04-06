"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useLogout from "./logout"
import { isErrorResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useHandleLogout(): (
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const logout = useLogout()

	return useCallback(async () => {
		try {
			logout()
			const response = await blueDotApiClient.authDataService.logout()
			if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.authDataService, logout])
}
