"use client"

import { useCallback } from "react"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useGetAuthDataFromStorage(): () => void {

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		blueDotApiClientClass.httpClient.accessToken = accessToken
		socketClass.setAccessToken(accessToken)
	}, [])
}
