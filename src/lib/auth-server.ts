import { headers } from 'next/headers'

export interface AuthState {
	isAuthenticated: boolean
	hasCompletedSignup: boolean
	userId: number | null
	username: string | null
	shouldShowAuthComponent: boolean
}

export async function getAuthState(): Promise<AuthState> {
	const headersList = await headers()

	const authState = headersList.get('x-auth-state') || 'unauthenticated'
	const userId = headersList.get('x-user-id')
	const username = headersList.get('x-username')
	const hasCompletedSignup = headersList.get('x-has-completed-signup') === 'true'
	const shouldShowAuthComponent = headersList.get('x-show-auth-component') === 'true'

	return {
		isAuthenticated: authState === 'authenticated' || authState === 'authenticated-incomplete',
		hasCompletedSignup,
		userId: userId ? parseInt(userId, 10) : null,
		username: username || null,
		shouldShowAuthComponent
	}
}
