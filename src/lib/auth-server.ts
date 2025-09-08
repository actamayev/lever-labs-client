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

	// Try to get consolidated auth data first (new format)
	const authDataHeader = headersList.get('x-auth-data')
	if (authDataHeader) {
		try {
			const authData = JSON.parse(authDataHeader)
			return {
				isAuthenticated: authData.state === 'authenticated' || authData.state === 'authenticated-incomplete',
				hasCompletedSignup: authData.hasCompletedSignup,
				userId: authData.userId,
				username: authData.username || null,
				shouldShowAuthComponent: headersList.get('x-show-auth-component') === 'true'
			}
		} catch (error) {
			console.error('Failed to parse auth data header:', error)
		}
	}

	// Fallback to old header format for backward compatibility
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
