"use client"

import { useCallback } from "react"
import authClass from "../../classes/auth-context"
import { useSocketContext } from "../../classes/socket-context"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const blueDotApiClient = useApiClientContext()
	const socketClass = useSocketContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		blueDotApiClient.httpClient.accessToken = accessToken
		socketClass.setAccessToken(accessToken)
	}, [blueDotApiClient.httpClient, socketClass])
}
