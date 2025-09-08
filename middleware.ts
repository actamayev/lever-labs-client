
import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

interface JwtPayload {
	userId: number
	username: string | null
	isActive?: boolean
	iat?: number
	exp?: number
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
	try {
		// Get JWT from cookie
		const token = request.cookies.get("auth_token")?.value

		if (!token) {
			return handleUnauthenticated()
		}

		// Verify JWT using secure environment variable
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload }

		const hasCompletedSignup = Boolean(payload.username)
		const isActive = payload.isActive !== false // Default to true if not specified

		if (!isActive) {
			return handleUnauthenticated()
		}

		// Handle authenticated users
		return handleAuthenticated({
			hasCompletedSignup,
			userId: payload.userId,
			username: payload.username
		})

	} catch (error) {
		console.error("JWT verification failed:", error)
		return handleUnauthenticated()
	}
}

function handleUnauthenticated(): NextResponse {
	const response = NextResponse.next()

	// Set consistent auth data header
	const authData = {
		state: "unauthenticated",
		userId: null,
		username: "",
		hasCompletedSignup: false
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

function handleAuthenticated(auth: {
	hasCompletedSignup: boolean,
	userId: number,
	username: string | null
}): NextResponse {
	const response = NextResponse.next()

	// Set auth data based on signup completion
	const authData = {
		state: auth.hasCompletedSignup ? "authenticated" : "authenticated-incomplete",
		userId: auth.userId,
		username: auth.username || "",
		hasCompletedSignup: auth.hasCompletedSignup
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

// Configure which paths the middleware should run on
export const config = {
	matcher: [
		// Run middleware on protected routes that need authentication
		"/garage/:path*",
		"/add-pip/:path*",
		"/sandbox/:path*",
		"/settings/:path*",
		"/career-quest/:path*",
		"/class-manager/:path*",
		"/whiteboard/:path*",
		"/register-google",
		"/mission",
		"/schools",
		"/terms",
		"/privacy",
		"/community-guidelines"
	],
}
