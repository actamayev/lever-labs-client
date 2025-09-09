"use client"

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

	// Sync server auth state with client immediately if needed
	if (!authClass.isLoggedIn && authState.isAuthenticated) {
		authClass.setAuthState({
			isAuthenticated: authState.isAuthenticated,
			hasCompletedSignup: authState.hasCompletedSignup
		})
		careerQuestClass.reinitialize()
	}

	// Use client auth state (prioritized for smooth updates) or fall back to server state
	const isAuthenticated = authClass.isLoggedIn || authState.isAuthenticated

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
