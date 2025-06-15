"use client"

import { useCallback } from "react"
import authClass from "../../classes/auth-class"
import { useSocketContext } from "../../classes/socket-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useGetAuthDataFromStorage(): () => void {
	const socketClass = useSocketContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		blueDotApiClientClass.httpClient.accessToken = accessToken
		socketClass.setAccessToken(accessToken)
	}, [socketClass])
}
