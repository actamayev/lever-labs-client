"use client"

import { useCallback } from "react"
import authClass from "../../classes/auth-context"
import { useSocketContext } from "../../classes/socket-context"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"
import { LoginSuccess, RegisterSuccess } from "@bluedotrobots/common-ts"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginSuccess | RegisterSuccess) => void {
	const socketClass = useSocketContext()
	const blueDotApiClient = useApiClientContext()

	return useCallback((authData: LoginSuccess | RegisterSuccess): void => {
		blueDotApiClient.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
		socketClass.setAccessToken(authData.accessToken)
	}, [blueDotApiClient.httpClient, socketClass])
}
