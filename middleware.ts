// Add this to your existing middleware.ts
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
		// Get theme from cookie for SSR
		const themeCookie = request.cookies.get("site_theme")?.value || "light"

		// Get JWT from cookie
		const token = request.cookies.get("auth_token")?.value

		if (!token) {
			return handleUnauthenticated(themeCookie)
		}

		// Verify JWT using secure environment variable
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload }

		const hasCompletedSignup = Boolean(payload.username)
		const isActive = payload.isActive !== false

		if (!isActive) {
			return handleUnauthenticated(themeCookie)
		}

		// Handle authenticated users
		return handleAuthenticated({
			hasCompletedSignup,
			userId: payload.userId,
			username: payload.username
		}, themeCookie)

	} catch (error) {
		console.error("JWT verification failed:", error)
		const themeCookie = request.cookies.get("site_theme")?.value || "light"
		return handleUnauthenticated(themeCookie)
	}
}

function handleUnauthenticated(theme: string): NextResponse {
	const response = NextResponse.next()

	// Set consistent auth data header with theme
	const authData = {
		state: "unauthenticated",
		userId: null,
		username: "",
		hasCompletedSignup: false,
		theme: theme
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

function handleAuthenticated(auth: {
	hasCompletedSignup: boolean,
	userId: number,
	username: string | null
}, theme: string): NextResponse {
	const response = NextResponse.next()

	// Set auth data with theme
	const authData = {
		state: auth.hasCompletedSignup ? "authenticated" : "authenticated-incomplete",
		userId: auth.userId,
		username: auth.username || "",
		hasCompletedSignup: auth.hasCompletedSignup,
		theme: theme
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

// Keep your existing config
export const config = {
	matcher: [
		"/garage/:path*",
		"/add-pip/:path*",
		"/sandbox/:path*",
		"/settings/:path*",
		"/career-quest/:path*",
		"/class-manager/:path*",
		"/whiteboard/:path*",
		"/register-google",
		"/mission",
		"/contact",
		"/schools",
		"/terms",
		"/privacy",
		"/community-guidelines"
	],
}
