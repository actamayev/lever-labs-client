"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export interface ClientAuthState {
  isAuthenticated: boolean
  hasCompletedSignup: boolean
  userId: number | null
  username: string | null
  shouldShowAuthComponent: boolean
  isLoading: boolean
}

/**
 * Client-side auth hook
 * Gets initial state from server, handles auth actions
 */
export function useAuth(): ClientAuthState & {
  logout: () => Promise<void>
  refreshAuthState: () => void
  } {
	const router = useRouter()
	const [authState, setAuthState] = useState<ClientAuthState>({
		isAuthenticated: false,
		hasCompletedSignup: false,
		userId: null,
		username: null,
		shouldShowAuthComponent: false,
		isLoading: true
	})

	// Get initial auth state from server-rendered page
	useEffect(() => {
		// In client components, we need to get the auth state from the server
		// This will be passed down from server components or we can make it available globally
		// For now, we'll set loading to false and let server components handle the auth state
		setAuthState(prev => ({ ...prev, isLoading: false }))
	}, [])

	const logout = async (): Promise<void> => {
		try {
			// Call logout endpoint to clear cookie
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include"
			})

			// Refresh the page to let middleware handle the new state
			router.refresh()

		} catch (error) {
			console.error("Logout error:", error)
		}
	}

	const refreshAuthState = (): void => {
		// Trigger a page refresh to get new auth state from middleware
		router.refresh()
	}

	return {
		...authState,
		logout,
		refreshAuthState
	}
}

/**
 * Helper hook to get auth state from server component props
 * Use this pattern to pass auth state from server to client components
 */
export function useAuthFromProps(serverAuthState: {
  isAuthenticated: boolean
  hasCompletedSignup: boolean
  userId: number | null
  username: string | null
  shouldShowAuthComponent: boolean
}): ClientAuthState {
	return {
		...serverAuthState,
		isLoading: false
	}
}
