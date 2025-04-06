"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import useLogout from "../auth/logout"

export default function useLogoutListenerUseEffect(): void {
	// not calling the api in handle logout here on purpose - just need to get the user out where they're connected to internet or not
	const logout = useLogout()
	const router = useRouter()

	const handleStorageChange = useCallback((event: StorageEvent): void => {
		if (event.key !== "Access Token" || event.newValue) return
		// Access Token was cleared, trigger logout
		logout()
		router.refresh()
	}, [logout, router])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
