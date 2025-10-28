"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import authClass from "@/classes/auth-class"
import { AuthState } from "@/lib/auth-server"
import ShowAuthToNullUser from "@/components/auth/show-auth-to-null-user"
import careerQuestClass from "@/classes/career-quest-class"

interface AuthenticatedLayoutClientProps {
	children: React.ReactNode
	authState: AuthState
}

function AuthenticatedLayoutClient({
	children,
	authState
}: AuthenticatedLayoutClientProps): React.ReactNode {

	// Sync server auth state with client in effect to avoid setState during render
	useEffect((): void => {
		if (!authClass.isLoggedIn && authState.isAuthenticated) {
			authClass.setAuthState({
				isAuthenticated: authState.isAuthenticated,
				hasCompletedSignup: authState.hasCompletedSignup
			})
			careerQuestClass.reinitialize()
		}
	}, [authState.isAuthenticated, authState.hasCompletedSignup])

	// Prioritize client state when user is logging out to prevent stale server state issues
	const isAuthenticated = authClass.isLoggingOut ? authClass.isLoggedIn : (authClass.isLoggedIn || authState.isAuthenticated)

	// If not authenticated, show auth component
	if (!isAuthenticated) {
		return <ShowAuthToNullUser />
	}

	// User is authenticated, show the protected content
	return (
		<div className="text-question-text">
			{children}
		</div>
	)
}

export default observer(AuthenticatedLayoutClient)
