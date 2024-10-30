import _ from "lodash"
import { useCallback } from "react"
import useLogout from "./logout"
import { isErrorResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useHandleLogout(
	setLogoutDisabled: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.MouseEvent<HTMLButtonElement>
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const logout = useLogout()

	return useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			const response = await blueDotApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			logout()
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}, [blueDotApiClient.authDataService, logout, setLogoutDisabled])
}
