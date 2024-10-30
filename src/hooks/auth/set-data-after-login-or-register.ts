import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginOrRegisterSuccess) => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()

	return useCallback((authData: LoginOrRegisterSuccess): void => {
		blueDotApiClient.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
	}, [authClass, blueDotApiClient.httpClient])
}
