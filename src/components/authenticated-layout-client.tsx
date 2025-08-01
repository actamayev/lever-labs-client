"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import authClass from "@/classes/auth-class"
import { AuthState } from "@/lib/auth-server"
import ShowAuthToNullUser from "@/components/auth/show-auth-to-null-user"

interface AuthenticatedLayoutClientProps {
	children: React.ReactNode
	authState: AuthState
}

function AuthenticatedLayoutClient({
	children,
	authState
}: AuthenticatedLayoutClientProps) {

	// Sync server auth state with client auth state on mount (but don't override if client has newer state)
	useEffect(() => {
		// Only update from server state if client doesn't have auth state yet
		// This handles page refreshes where middleware has auth state but client state is empty
		if (!authClass.isLoggedIn && authState.isAuthenticated) {
			authClass.setAuthState({
				isAuthenticated: authState.isAuthenticated,
				hasCompletedSignup: authState.hasCompletedSignup
			})
		}
	}, [authState])

	// Use client auth state (prioritized for smooth updates) or fall back to server state
	const isAuthenticated = authClass.isLoggedIn || authState.isAuthenticated
	const shouldShowAuthComponent = authState.shouldShowAuthComponent

	// If middleware says to show auth component (like on /garage when not authenticated)
	if (shouldShowAuthComponent && !isAuthenticated) {
		return <ShowAuthToNullUser />
	}

	// If not authenticated, show auth component
	if (!isAuthenticated) {
		return <ShowAuthToNullUser />
	}

	// User is authenticated, show the protected content
	return (
		<div className="text-questionText">
			{children}
		</div>
	)
}

export default observer(AuthenticatedLayoutClient)
