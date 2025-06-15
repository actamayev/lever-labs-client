"use client"

import { useCallback } from "react"
import useLogout from "./logout"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"

export default function useHandleLogout(): (
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const logout = useLogout()

	return useCallback(async () => {
		try {
			// Awaiting here so that the access token isn't cleared before the request is sent
			await blueDotApiClient.authDataService.logout()
			await logout()
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.authDataService, logout])
}
