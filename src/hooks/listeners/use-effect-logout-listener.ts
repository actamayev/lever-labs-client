"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import logout from "../../utils/auth/logout"
import useTypedNavigate from "../navigate/use-typed-navigate"

export default function useEffectLogoutListener(): void {
	// not calling the api in handle logout here on purpose - just need to get the user out where they're connected to internet or not
	const router = useRouter()
	const navigate = useTypedNavigate()

	const handleStorageChange = useCallback(async (event: StorageEvent): Promise<void> => {
		if (event.key !== "Access Token" || event.newValue) return
		// Access Token was cleared, trigger logout
		await logout()
		navigate("/")
		router.refresh()
	}, [navigate, router])

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange)

		return (): void => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [handleStorageChange])
}
