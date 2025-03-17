"use client"

import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const socketClass = useSocketContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		blueDotApiClient.httpClient.accessToken = accessToken
		socketClass.setAccessToken(accessToken)
	}, [authClass, blueDotApiClient.httpClient, socketClass])
}
