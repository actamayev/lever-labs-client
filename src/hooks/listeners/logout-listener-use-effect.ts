import { useCallback, useEffect } from "react"
import useLogout from "../auth/logout"

export default function useLogoutListenerUseEffect(): void {
	const logout = useLogout()

	const handleStorageChange = useCallback((event: StorageEvent): void => {
		if (event.key !== "Access Token" || event.newValue) return
		// Access Token was cleared, trigger logout
		logout()
		window.location.reload()
	}, [logout])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
