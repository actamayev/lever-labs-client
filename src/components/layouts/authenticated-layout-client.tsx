"use client"
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
}: AuthenticatedLayoutClientProps): React.ReactNode {

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
