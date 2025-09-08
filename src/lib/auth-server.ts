import { headers } from 'next/headers'

export interface AuthState {
	isAuthenticated: boolean
	hasCompletedSignup: boolean
	userId: number | null
	username: string | null
}

export async function getAuthState(): Promise<AuthState> {
	const headersList = await headers()

	// Get consolidated auth data from middleware
	const authDataHeader = headersList.get('x-auth-data')
	
	if (authDataHeader) {
		try {
			const authData = JSON.parse(authDataHeader)
			return {
				isAuthenticated: authData.state === 'authenticated' || authData.state === 'authenticated-incomplete',
				hasCompletedSignup: authData.hasCompletedSignup,
				userId: authData.userId,
				username: authData.username || null
			}
		} catch (error) {
			console.error('Failed to parse auth data header:', error)
		}
	}

	// Default to unauthenticated state if no header or parsing fails
	return {
		isAuthenticated: false,
		hasCompletedSignup: false,
		userId: null,
		username: null
	}
}
