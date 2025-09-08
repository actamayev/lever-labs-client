// src/hooks/auth/use-cookie-watcher.ts
"use client"

import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import logout from "../../utils/auth/logout"

// Helper function to check if auth cookie exists
const getAuthCookie = (): string | null => {
	if (typeof document === "undefined") return null

	const cookies = document.cookie.split(";")
	const authCookie = cookies.find((cookie): boolean =>
		cookie.trim().startsWith("auth_token=")
	)

	return authCookie ? authCookie.split("=")[1].trim() : null
}

export default function useCookieWatcher(): void {
	useEffect((): () => void => {
		// Only run if user is currently logged in
		if (!authClass.isLoggedIn) return (): void => {}

		const handleVisibilityChange = (): void => {
			// Only check when page becomes visible (user returns to tab)
			if (document.visibilityState === "visible") {
				// If user thinks they're logged in but cookie is missing
				if (authClass.isLoggedIn && !getAuthCookie()) {
					console.log("Auth cookie deleted - logging out user")
					void logout()
				}
			}
		}

		const handleFocus = (): void => {
			// Also check on window focus
			if (authClass.isLoggedIn && !getAuthCookie()) {
				console.log("Auth cookie deleted - logging out user")
				void logout()
			}
		}

		// Listen for page visibility changes
		document.addEventListener("visibilitychange", handleVisibilityChange)

		// Listen for window focus (backup)
		window.addEventListener("focus", handleFocus)

		// Cleanup
		return (): void => {
			document.removeEventListener("visibilitychange", handleVisibilityChange)
			window.removeEventListener("focus", handleFocus)
		}
	}, [])
}
