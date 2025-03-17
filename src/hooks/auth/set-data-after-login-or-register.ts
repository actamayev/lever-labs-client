"use client"

import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginSuccess | RegisterSuccess) => void {
	const authClass = useAuthContext()
	const socketClass = useSocketContext()
	const blueDotApiClient = useApiClientContext()

	return useCallback((authData: LoginSuccess | RegisterSuccess): void => {
		blueDotApiClient.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
		socketClass.setAccessToken(authData.accessToken)
	}, [authClass, blueDotApiClient.httpClient, socketClass])
}
