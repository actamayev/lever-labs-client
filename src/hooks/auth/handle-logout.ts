"use client"

import { useCallback } from "react"
import useLogout from "./logout"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useHandleLogout(): (
) => Promise<void> {
	const logout = useLogout()

	return useCallback(async () => {
		try {
			// Awaiting here so that the access token isn't cleared before the request is sent
			await blueDotApiClientClass.authDataService.logout()
			await logout()
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClientClass.authDataService, logout])
}
