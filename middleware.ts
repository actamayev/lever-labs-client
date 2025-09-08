
import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

interface JwtPayload {
	userId: number
	username: string | null
	isActive?: boolean
	iat?: number
	exp?: number
}

// Helper function to clear auth cookie
function clearAuthCookie(response: NextResponse): void {
	response.cookies.set("auth_token", "", {
		expires: new Date(0),
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax"
	})
}

// Helper function to create redirect response
function createRedirect(request: NextRequest, path: string): NextResponse {
	return NextResponse.redirect(new URL(path, request.url))
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { pathname } = request.nextUrl

	// Get theme from cookie for SSR
	const themeCookie = request.cookies.get("site_theme")?.value || "light"

	try {
		// Get JWT from cookie
		const token = request.cookies.get("auth_token")?.value

		let userId: number | null = null
		let username: string | null = null
		let isActive = true

		// Step 1: Token Extraction & Validation
		if (token) {
			try {
				const secret = new TextEncoder().encode(process.env.JWT_SECRET)
				const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload }

				userId = payload.userId || null
				username = payload.username || null
				isActive = payload.isActive !== false
			} catch (error) {
				console.error("JWT verification failed:", error)
				// Token is invalid, treat as unauthenticated
				userId = null
				username = null
			}
		}

		// Step 2: Auth State Classification & Rule Application

		// Rule #2: Invalid state (username but no userId) - potential tampering
		if (username && !userId) {
			const response = createRedirect(request, "/")
			clearAuthCookie(response)
			return response
		}

		// Rule #2: Inactive user - clear cookie and redirect
		if (userId && !isActive) {
			const response = createRedirect(request, "/")
			clearAuthCookie(response)
			return response
		}

		// Unauthenticated state (no token, invalid token, or no userId and no username)
		if (!userId && !username) {
			// Rule #1: Unauthenticated user on /register-google → redirect to /register
			if (pathname === "/register-google") {
				return createRedirect(request, "/register")
			}
			// Continue normally for unauthenticated users on other pages
			return handleUnauthenticated(themeCookie)
		}

		// Rule #4: Incomplete signup (userId but no username) → redirect to /register-google
		if (userId && !username) {
			if (pathname !== "/register-google") {
				return createRedirect(request, "/register-google")
			}
			// User is on /register-google page, continue normally
			return handleIncompleteSignup(userId, themeCookie)
		}

		// Rule #3: Fully authenticated (both userId and username) → redirect from auth pages to /garage
		if (userId && username) {
			const authPages = ["/", "/login", "/register", "/register-google"]
			if (authPages.includes(pathname)) {
				return createRedirect(request, "/garage")
			}
			// User is authenticated on other pages, continue normally
			return handleAuthenticated({ userId, username }, themeCookie)
		}

		// Fallback (shouldn't reach here)
		return handleUnauthenticated(themeCookie)

	} catch (error) {
		console.error("Middleware error:", error)
		// On any error, treat as unauthenticated
		return handleUnauthenticated(themeCookie)
	}
}

function handleUnauthenticated(theme: string): NextResponse {
	const response = NextResponse.next()

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

function handleIncompleteSignup(userId: number, theme: string): NextResponse {
	const response = NextResponse.next()

	const authData = {
		state: "authenticated-incomplete",
		userId: userId,
		username: "",
		hasCompletedSignup: false,
		theme: theme
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

function handleAuthenticated(auth: { userId: number, username: string }, theme: string): NextResponse {
	const response = NextResponse.next()

	const authData = {
		state: "authenticated",
		userId: auth.userId,
		username: auth.username,
		hasCompletedSignup: true,
		theme: theme
	}
	response.headers.set("x-auth-data", JSON.stringify(authData))

	return response
}

// Configure to run on all routes except Next.js internals
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
}
