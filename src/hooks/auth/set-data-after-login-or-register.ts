"use client"

import { useCallback } from "react"
import authClass from "../../classes/auth-class"
import { useSocketContext } from "../../classes/socket-context"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { LoginSuccess, RegisterSuccess } from "@bluedotrobots/common-ts"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginSuccess | RegisterSuccess) => void {
	const socketClass = useSocketContext()
	
	return useCallback((authData: LoginSuccess | RegisterSuccess): void => {
		blueDotApiClientClass.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
		socketClass.setAccessToken(authData.accessToken)
	}, [blueDotApiClientClass.httpClient, socketClass])
}
