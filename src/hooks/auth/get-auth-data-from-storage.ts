import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		blueDotApiClient.httpClient.accessToken = accessToken
	}, [authClass, blueDotApiClient.httpClient])
}
